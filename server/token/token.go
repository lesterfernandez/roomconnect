package token

import (
	"encoding/json"
	"github.com/golang-jwt/jwt/v5"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"net/http"
	"time"
)

// Encode JWT Token into JSON
func SendJWT(w http.ResponseWriter, jwt string) {
	w.Header().Set("Application-Type", "application/json")
	json.NewEncoder(w).Encode(data.TokenMessage{Token: jwt})
}

// Create JWT =====================================================================
func CreateJWT(username string) (string, error) {

	expirationTime := time.Now().Add(time.Minute * 5)

	claims := &jwt.RegisteredClaims{
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(data.JWTKey)

	return tokenString, err
}
