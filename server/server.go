package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/golang-jwt/jwt/v5"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"golang.org/x/crypto/bcrypt"
)

// Create JWT =====================================================================
func createJWT(username string) (string, error) {

	expirationTime := time.Now().Add(time.Minute * 5)

	claims := &jwt.RegisteredClaims{
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(data.JWTKey)

	return tokenString, err
}

// Register a new User ====================================================
func registerUser(w http.ResponseWriter, res *http.Request) {
	newUser := data.RegisterBody{}
	decodeErr := json.NewDecoder(res.Body).Decode(&newUser)

	//if username or password are blank or invalid, throw 400 error
	if decodeErr != nil || newUser.Username == "" || newUser.Password == "" {
		respondWithError(w, "Invalid Username or Password", http.StatusBadRequest)
		fmt.Println(decodeErr)
		return
	}

	//if username already exists, throw conflict error
	if data.UserExists(newUser.Username) {
		respondWithError(w, "User already exists", http.StatusConflict)
		return
	}

	//encrypt password
	passDigest, hashErr := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	if hashErr != nil {
		respondWithError(w, "Something went wrong", http.StatusInternalServerError)
		return
	}
	//temporarily print password, so that its not an unused variable
	fmt.Printf("Encrypted Password: %v\n", passDigest)

	data.Users = append(data.Users, &newUser)

	jwtToken, signingErr := createJWT(newUser.Username)
	if signingErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
	}

	sendJWT(w, jwtToken)

}

// Handle Login ==============================================================
func LoginUser(w http.ResponseWriter, res *http.Request) {
	returningUser := data.RegisterBody{}
	err := json.NewDecoder(res.Body).Decode(&returningUser)
	if err != nil {
		respondWithError(w, "Error", http.StatusBadRequest)
		return
	}

	//check if both username and password match
	found := false
	if data.IsValidLogin(returningUser.Username, returningUser.Password) {
		found = true
		fmt.Printf("Success, matching user found: %v\n", returningUser.Username)

	}

	//if username/password mismatch or don't exist, throw error
	if !found {
		respondWithError(w, "Incorrect Username or Password", http.StatusBadRequest)
		return
	}

	//Create JWT, store it in jwtToken var
	jwtToken, signingErr := createJWT(returningUser.Username)
	if signingErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
	}

	sendJWT(w, jwtToken)

}

// Handle /implicit_login
func handleImplicitLogin(w http.ResponseWriter, res *http.Request) {
	headers := res.Header
	authHeader := headers.Get("Authentication")
	fmt.Printf("AuthenticationHeader = %v\n", authHeader)

}

//Utility Functions ========================================================================================

// Handle Error Response
func respondWithError(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(data.ApiError{ErrorMessage: msg})

}

// Encode JWT Token into JSON
func sendJWT(w http.ResponseWriter, jwt string) {
	json.NewEncoder(w).Encode(data.TokenMessage{Token: jwt})
}

// Verify JWT
// func validateJWT(token string) {
// claims := data.Claims{}

// }

func main() {

	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	r.Post("/register", registerUser)
	r.Post("/login", LoginUser)
	r.Get("/implicit_login", handleImplicitLogin)

	fmt.Println("Server started on Port 3000")
	http.ListenAndServe(":3000", r)

}
