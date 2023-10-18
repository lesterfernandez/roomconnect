package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/joho/godotenv"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/handlers"
	"github.com/rs/cors"
)

func main() {
	dotEnvErr := godotenv.Load()

	if dotEnvErr != nil {
		dotEnvErr = godotenv.Load(".env.template")
	}

	if dotEnvErr != nil {
		log.Fatal(".env and .env.template files not found!")
	}

	r := chi.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	})

	r.Use(c.Handler)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	r.Post("/register", handlers.RegisterUser)
	r.Post("/login", handlers.LoginUser)
	r.Get("/implicit_login", handlers.HandleImplicitLogin)
	r.Get("/search", handlers.SearchUsers)

	data.Connect()
	defer data.Close()

	fmt.Println("Server started on Port 3000")
	http.ListenAndServe(":3000", r)

}
