package data

import (
	"github.com/golang-jwt/jwt"
)

var Users []*RegisterBody

var JWTKey = []byte("secret")

type Claims struct {
	Username string
	jwt.StandardClaims
}

type RegisterBody struct {
	profilePic  string
	displayName string
	budget      int
	gender      string
	cleanliness int
	loudness    int
	coed        bool
	Username    string
	Password    string
}

type UserCredentials struct {
	Username string
	Password string
}

type ChatMessage struct {
	Type string
	From string
	To   string
}

type ApiError struct {
	ErrorMessage string
}

type TokenMessage struct {
	Token string
}

func UserExists(username string) bool {
	for _, v := range Users {
		if v.Username == username {
			return true
		}
	}
	return false
}

func IsValidLogin(username string, password string) bool {
	for _, v := range Users {
		if username == v.Username && password == v.Password {
			return true
		}
	}
	return false
}
