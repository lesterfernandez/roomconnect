package token

import (
	"os"
	"testing"
)

func TestCreateJWT(t *testing.T) {
	username := "Hank"
	_, err := CreateJWT(username)

	if err != nil {
		t.Errorf("CreateJWT(%s) returned err: %s", username, err)
	}

}

func TestVerifyJWT(t *testing.T) {
	username := "Gustavo"
	tokenString, _ := CreateJWT(username)
	token, err := VerifyJWT(tokenString)

	if err != nil {
		t.Errorf("VerifyJWT(%s, %s) returned err: %s", username, os.Getenv("JWT_SECRET"), err)
	}

	subject, _ := token.Claims.GetSubject()

	if subject != username {
		t.Errorf("VerifyJWT(%s) returned token with subject %s", username, subject)
	}

}
