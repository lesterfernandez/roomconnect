package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/token"
)

func (s *Server) registerUser(w http.ResponseWriter, res *http.Request) {
	newUser := data.RegisterBody{}
	decodeErr := json.NewDecoder(res.Body).Decode(&newUser)

	if decodeErr != nil || newUser.Username == "" || newUser.Password == "" {
		respondWithError(w, "Invalid Username or Password", http.StatusBadRequest)
		return
	}

	if s.User.UserExists(newUser.Username) {
		respondWithError(w, "User already exists", http.StatusConflict)
		return
	}

	err := s.User.CreateUser(newUser)
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

func (s *Server) loginUser(w http.ResponseWriter, res *http.Request) {
	returningUser := data.UserCredentials{}
	err := json.NewDecoder(res.Body).Decode(&returningUser)
	if err != nil {
		respondWithError(w, "Error", http.StatusBadRequest)
		return
	}

	if found := s.User.IsValidLogin(returningUser.Username, returningUser.Password); !found {
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

func (s *Server) loginImplicitly(w http.ResponseWriter, res *http.Request) {
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
	foundUser := s.User.GetUser(subject)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(foundUser)
}
