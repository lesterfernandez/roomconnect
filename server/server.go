package main

import (
	"fmt"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/handlers"
)

func main() {
	godotenv.Load(".env")

	s := handlers.Server{User: data.NewUserRepo()}

	customHandler := handlers.CreateHandler(&s)

	data.ConnectDatabase()
	defer data.CloseDatabase()

	data.ConnectRedis()
	defer data.CloseRedis()

	fmt.Println("Server started on Port 3000")
	http.ListenAndServe(":3000", customHandler)
}
