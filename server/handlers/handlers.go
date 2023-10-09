package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/token"
)

// ==============================================================================
//									REGISTER USER
// ==============================================================================

func RegisterUser(w http.ResponseWriter, res *http.Request) {
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

	err := data.CreateUser(newUser)
	if err == nil {
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

// ==============================================================================
//							   HANDLE USER LOGIN
// ==============================================================================

func LoginUser(w http.ResponseWriter, res *http.Request) {
	returningUser := data.UserCredentials{}
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
	jwtToken, signingErr := token.CreateJWT(returningUser.Username)
	if signingErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	token.SendJWT(w, jwtToken)

}

// ==============================================================================
//							HANDLE IMPLICIT LOGIN
// ==============================================================================

func HandleImplicitLogin(w http.ResponseWriter, res *http.Request) {
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
