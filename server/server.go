package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/golang-jwt/jwt"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"golang.org/x/crypto/bcrypt"
)

// Register a new User ====================================================
func registerUser(w http.ResponseWriter, res *http.Request) {
	newUser := data.RegisterBody{}
	decodeErr := json.NewDecoder(res.Body).Decode(&newUser)

	fmt.Println(decodeErr)

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

	w.Write([]byte("User Created"))
	data.Users = append(data.Users, &newUser)

	for _, v := range data.Users {
		fmt.Printf("User: %v\n", *v)
	}

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
	for _, v := range data.Users {
		if v.Username == returningUser.Username && v.Password == returningUser.Password {
			found = true
			fmt.Printf("Success, matching user found: %v\n", v.Username)
			w.Write([]byte("User found"))
		}
	}

	//if username/password mismatch or don't exist, throw error
	if !found {
		respondWithError(w, "Incorrect Username or Password", http.StatusBadRequest)
		return
	}

	//set up JWT ====================
	expirationTime := time.Now().Add(time.Minute * 5)

	claims := &data.Claims{
		Username: returningUser.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	jwtKey := []byte("secret")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	//temporarily print tokenString, to remove "unused variable" error
	fmt.Println(tokenString)
}

// Handle Error Response =====================================================
func respondWithError(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(data.ApiError{ErrorMessage: msg})

}

func main() {

	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	r.Post("/register", registerUser)
	r.Post("/login", LoginUser)

	fmt.Println("Server started on Port 3000")
	http.ListenAndServe(":3000", r)

}
