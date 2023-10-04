package token

import (
	"encoding/json"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"net/http"
	"time"
)

var JWTKey = []byte("secret")

//=====================================================================================
// Encode JWT into JSON, send it as response
//=====================================================================================

func SendJWT(w http.ResponseWriter, jwt string) {
	w.Header().Set("Application-Type", "application/json")
	json.NewEncoder(w).Encode(data.TokenMessage{Token: jwt})
}

//=====================================================================================
// Create JWT
//=====================================================================================

func CreateJWT(username string) (string, error) {

	expirationTime := time.Now().Add(time.Minute * 1)

	claims := &jwt.RegisteredClaims{
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JWTKey)

	return tokenString, err
}

//========================================================================================================
// Verify that a JWT is valid, and return the registeredClaims
//========================================================================================================

func VerifyJWT(tokenString string, secretKey []byte) (jwt.MapClaims, error) {

	//Verify that the signing method is correct
	verifySigningMethod := func(token *jwt.Token) (interface{}, error) {
		// Check the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		// Return the secret key for validation
		return secretKey, nil
	}

	// Parse the JWT token using verifySigningMethod
	token, err := jwt.Parse(tokenString, verifySigningMethod)

	if err != nil {
		return nil, err
	}

	// Verify if token is valid
	if !token.Valid {
		return nil, fmt.Errorf("token is not valid")
	}

	// Extract the claims from the token
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("failed to parse claims")
}
