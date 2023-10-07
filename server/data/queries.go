package data

var JWTKey = []byte("secret")

type RegisterBody struct {
	ProfilePic  string
	DisplayName string
	Budget      int
	Gender      string
	Cleanliness int
	Loudness    int
	Coed        bool
	Username    string
	Password    string
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
