package handlers

import (
	"net/http"
	"strings"

	"github.com/lesterfernandez/roommate-finder/server/token"
)

func AuthenticateRoute(handler http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		headers := r.Header
		authHeader := headers.Get("Authorization")

		// Check if the Auth Header has valid format
		if len(authHeader) == 0 || !strings.Contains(authHeader, " ") {
			respondWithError(w, "Invalid token", http.StatusBadRequest)
			return
		}

		// Validate token
		splitAuthHeader := strings.Split(authHeader, " ")

		if len(splitAuthHeader) != 2 {
			respondWithError(w, "Invalid token format", http.StatusBadRequest)
			return
		}

		JWT := splitAuthHeader[1]
		_, err := token.VerifyJWT(JWT)

		if err != nil {
			respondWithError(w, "Error validating token", http.StatusUnauthorized)
			return
		}

		handler.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}
