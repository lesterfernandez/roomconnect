package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/rs/cors"
)

func CreateHandler() http.Handler {
	r := chi.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	})

	r.Use(c.Handler)

	r.Post("/register", registerUser)
	r.Post("/login", loginUser)
	r.Get("/implicit_login", loginImplicitly)
	r.Get("/search", searchUsers)

	return r
}

func respondWithError(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(data.ApiError{ErrorMessage: msg})
}
