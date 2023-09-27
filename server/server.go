package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"golang.org/x/crypto/bcrypt"
)

func registerUser(w http.ResponseWriter, res *http.Request) {
	newUser := data.RegisterBody{}
	decodeErr := json.NewDecoder(res.Body).Decode(&newUser)

	if decodeErr != nil || newUser.Username == "" || newUser.Password == "" {
		respondWithError(w, "Invalid Username or Password", http.StatusBadRequest)
		return
	}

	if data.UserExists(newUser.Username) {
		respondWithError(w, "User already exists", http.StatusConflict)
		return
	}

	passDigest, hashErr := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	if hashErr != nil {
		respondWithError(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	fmt.Println(passDigest)
	w.Write([]byte("User Created"))

}

func respondWithError(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	internalErrMsg, _ := json.Marshal(data.ApiError{ErrorMessage: msg})
	w.Write(internalErrMsg)

}

func main() {

	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	r.Post("/register", registerUser)

	http.ListenAndServe(":3000", r)

}
