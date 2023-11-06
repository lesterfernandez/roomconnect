package handlers

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/lesterfernandez/roommate-finder/server/token"
)

type ctxKey string

const ContextKey = ctxKey("token")

func AuthenticateRoute(handler http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		headers := r.Header
		authHeader := headers.Get("Authorization")

		// Check if the Auth Header has valid format
		if len(authHeader) == 0 || !strings.Contains(authHeader, " ") {
			respondWithError(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Validate token
		splitAuthHeader := strings.Split(authHeader, " ")

		if len(splitAuthHeader) != 2 {
			respondWithError(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		JWT := splitAuthHeader[1]
		token, err := token.VerifyJWT(JWT)

		if err != nil {
			respondWithError(w, "Error validating token", http.StatusUnauthorized)
			return
		}

		reqWithCtx := addContextToReq(r, token)
		handler.ServeHTTP(w, reqWithCtx)
	}
	return http.HandlerFunc(fn)
}

func addContextToReq(r *http.Request, token *jwt.Token) *http.Request {
	ctx := context.WithValue(context.Background(), ContextKey, token)
	reqWithContext := r.WithContext(ctx)
	return reqWithContext
}
