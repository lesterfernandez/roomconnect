package main

import (
	"fmt"
	"github.com/go-chi/chi"
	"github.com/lesterfernandez/roommate-finder/server/handlers"
	"net/http"
)

func main() {

	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	r.Post("/register", handlers.RegisterUser)
	r.Post("/login", handlers.LoginUser)
	r.Get("/implicit_login", handlers.HandleImplicitLogin)

	fmt.Println("Server started on Port 3000")
	http.ListenAndServe(":3000", r)

}
