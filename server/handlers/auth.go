package handlers

import (
	"context"
	"net/http"
	"strings"

	"github.com/lesterfernandez/roommate-finder/server/token"
)

type ctxKey string

const ContextKey = ctxKey("token")

func AuthenticateWS(handler http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		potentialToken := r.URL.Query().Get("token")
		reqWithCtx, verifyErr := addJWTContextToReq(potentialToken, r)
		if verifyErr != nil {
			respondWithError(w, "Invalid Token", http.StatusUnauthorized)
			return
		}
		handler.ServeHTTP(w, reqWithCtx)
	}
	return http.HandlerFunc(fn)

}

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

		reqWithCtx, err := addJWTContextToReq(JWT, r)
		if err != nil {
			respondWithError(w, "Error validating token", http.StatusUnauthorized)
		}
		handler.ServeHTTP(w, reqWithCtx)
	}
	return http.HandlerFunc(fn)
}

func addJWTContextToReq(jwt string, req *http.Request) (*http.Request, error) {
	token, verifyErr := token.VerifyJWT(jwt)

	if verifyErr != nil {
		return nil, verifyErr
	}

	ctx := context.WithValue(context.Background(), ContextKey, token)
	reqWithContext := req.WithContext(ctx)
	return reqWithContext, nil
}
