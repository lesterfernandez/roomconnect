package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/token"
)

func registerUser(w http.ResponseWriter, res *http.Request) {
	newUser := data.RegisterBody{}
	decodeErr := json.NewDecoder(res.Body).Decode(&newUser)

	if decodeErr != nil || newUser.Username == "" || newUser.Password == "" {
		respondWithError(w, "Invalid Username or Password", http.StatusBadRequest)
		return
	}

	if exists, existsErr := data.UserExists(newUser.Username); !exists {
		fmt.Println("Error while checking for existing user", existsErr.Error())
		respondWithError(w, "User already exists", http.StatusConflict)
		return
	}

	err := data.CreateUser(newUser)
	if err != nil {
		respondWithError(w, "Error creating user", http.StatusInternalServerError)
		return
	}

	jwtToken, signingErr := token.CreateJWT(newUser.Username)
	if signingErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	token.SendJWT(w, jwtToken)
}

func loginUser(w http.ResponseWriter, res *http.Request) {
	returningUser := data.UserCredentials{}
	err := json.NewDecoder(res.Body).Decode(&returningUser)
	if err != nil {
		respondWithError(w, "Error", http.StatusBadRequest)
		return
	}

	if found, foundErr := data.IsValidLogin(returningUser.Username, returningUser.Password); !found {
		fmt.Println("Error while authenticating user.", foundErr.Error())
		respondWithError(w, "Incorrect Username or Password", http.StatusUnauthorized)
		return
	}

	jwtToken, signingErr := token.CreateJWT(returningUser.Username)
	if signingErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	token.SendJWT(w, jwtToken)

}

func loginImplicitly(w http.ResponseWriter, res *http.Request) {
	headers := res.Header
	authHeader := headers.Get("Authorization")

	//Check if the Auth Header has valid format
	if !strings.Contains(authHeader, " ") {
		respondWithError(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	splitAuthHeader := strings.Split(authHeader, " ")
	JWT := splitAuthHeader[1]
	token, err := token.VerifyJWT(JWT, token.JWTKey)

	if err != nil {
		respondWithError(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	subject, _ := token.Claims.GetSubject()
	foundUser := data.GetUser(subject)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(foundUser)
}
