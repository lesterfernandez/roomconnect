package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/joho/godotenv"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/handlers"
)

func main() {
	dotEnvErr := godotenv.Load(".env")

	if dotEnvErr != nil {
		log.Fatal(".env file not found!")
	}

	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	r.Post("/register", handlers.RegisterUser)
	r.Post("/login", handlers.LoginUser)
	r.Get("/implicit_login", handlers.HandleImplicitLogin)

	data.Connect()
	defer data.Close()

	fmt.Println("Server started on Port 3000")
	http.ListenAndServe(":3000", r)

}
