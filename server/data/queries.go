package data

var JWTKey = []byte("secret")

type ChatMessage struct {
	Type string `json:"type"`
	From string `json:"from"`
	To   string `json:"to"`
}

type ApiError struct {
	ErrorMessage string `json:"errorMessage"`
}

type TokenMessage struct {
	Token string
}
