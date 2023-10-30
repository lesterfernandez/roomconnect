package token

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/lesterfernandez/roommate-finder/server/data"
)

const environmentKey string = "JWT_SECRET"

func SendJWT(w http.ResponseWriter, jwt string) {
	w.Header().Set("Application-Type", "application/json")
	json.NewEncoder(w).Encode(data.TokenMessage{Token: jwt})
}

func CreateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(time.Hour * 48)
	jwtSecret := []byte(os.Getenv(environmentKey))

	claims := &jwt.RegisteredClaims{
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)

	return tokenString, err
}

func VerifyJWT(tokenString string) (*jwt.Token, error) {
	jwtSecret := []byte(os.Getenv(environmentKey))

	//Verify the correct signing method is used (HS256)
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	}, jwt.WithValidMethods([]string{"HS256"}))

	if err != nil {
		return nil, err
	}

	// Verify if token is valid
	if !token.Valid {
		return nil, fmt.Errorf("token is not valid")
	}

	return token, nil
}
