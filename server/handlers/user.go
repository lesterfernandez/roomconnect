package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
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

	found, userFoundErr := s.User.UserExists(newUser.Username)
	if userFoundErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	if found {
		respondWithError(w, "User already exists", http.StatusConflict)
		return
	}

	createUserErr := s.User.CreateUser(newUser)
	if createUserErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	signedToken, signingErr := token.CreateJWT(newUser.Username)
	if signingErr != nil {
		fmt.Println("signingErr", signingErr)
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	token.SendJWT(w, signedToken)
}

func (s *Server) loginUser(w http.ResponseWriter, res *http.Request) {
	returningUser := data.UserCredentials{}

	decodeErr := json.NewDecoder(res.Body).Decode(&returningUser)
	if decodeErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	validLogin, validLoginErr := s.User.IsValidLogin(returningUser.Username, returningUser.Password)
	if validLoginErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	if !validLogin {
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
	token, err := token.VerifyJWT(JWT)

	if err != nil {
		respondWithError(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	subject, _ := token.Claims.GetSubject()
	user, getUserErr := s.User.GetUser(subject)
	if getUserErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (s *Server) editProfile(w http.ResponseWriter, req *http.Request) {

	verifiedToken := req.Context().Value(ContextKey).(*jwt.Token)

	subject, tokenErr := verifiedToken.Claims.GetSubject()
	if tokenErr != nil {
		respondWithError(w, "Invalid Token", http.StatusUnauthorized)
		return
	}

	user := data.UserProfile{}
	decodeErr := json.NewDecoder(req.Body).Decode(&user)
	if decodeErr != nil {
		respondWithError(w, "Invalid Profile Format", http.StatusBadRequest)
		return
	}
	updatedUser, updateErr := s.User.EditUser(&user, subject)
	if updateErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	encodeErr := json.NewEncoder(w).Encode(updatedUser)
	if encodeErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
	}

}
