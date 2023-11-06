package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/lesterfernandez/roommate-finder/server/data"
)

var searchFields = map[string]string{
	"budget":      "budget_tier",
	"cleanliness": "clean_tier",
	"gender":      "gender",
	"coed":        "coed",
	"loudness":    "loud_tier",
}

func (s *Server) searchUsers(w http.ResponseWriter, req *http.Request) {

	queryFields := [][2]string{}

	verifiedToken := req.Context().Value(ContextKey).(*jwt.Token)
	username, tokenErr := verifiedToken.Claims.GetSubject()
	if tokenErr != nil {
		respondWithError(w, "Invalid Token", http.StatusUnauthorized)
		return
	}

	order := [...]string{
		"budget",
		"cleanliness",
		"gender",
		"coed",
		"loudness"}

	for _, field := range order {
		queryValue := req.URL.Query().Get(field)
		if queryValue != "" {
			queryFields = append(queryFields, [2]string{searchFields[field], queryValue})
		}
	}

	users, usersErr := data.SearchUsers(queryFields, username)
	if usersErr != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	usersJson, err := json.Marshal(users)
	if err != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	w.Write(usersJson)
}
