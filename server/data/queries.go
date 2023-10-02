package data

var users []*RegisterBody

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

type ChatMessage struct {
	Type string
	From string
	To   string
}

type ApiError struct {
	ErrorMessage string
}

func UserExists(username string) bool {
	for _, v := range users {
		if v.Username == username {
			return true
		}
	}
	return false
}
