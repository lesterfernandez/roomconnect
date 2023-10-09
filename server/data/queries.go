package data

var JWTKey = []byte("secret")

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
