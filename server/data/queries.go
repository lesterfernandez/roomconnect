package data

var JWTKey = []byte("secret")

type ApiError struct {
	ErrorMessage string `json:"errorMessage"`
}

type TokenMessage struct {
	Token string `json:"token"`
}
