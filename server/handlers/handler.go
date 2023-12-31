package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/rs/cors"
)

type Server struct {
	User *data.UserRepo
}

func CreateHandler(s *Server) http.Handler {
	r := chi.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"POST", "PUT", "GET"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	})

	r.Use(c.Handler)

	r.Post("/register", s.registerUser)
	r.Post("/login", s.loginUser)
	r.Get("/implicit_login", s.loginImplicitly)

	r.Group(func(r chi.Router) {
		r.Use(AuthenticateRoute)

		// Authenticated routes
		r.Get("/search", s.searchUsers)
		r.Put("/profile", s.editProfile)
	})

	r.Group(func(r chi.Router) {
		r.Use(AuthenticateWS)

		r.Get("/chat", s.handleChat)

	})

	return r
}

func respondWithError(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(data.ApiError{ErrorMessage: msg})
}
