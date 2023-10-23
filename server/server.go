package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/handlers"
)

func loadEnv() error {
	if dotEnvErr := godotenv.Load(); dotEnvErr == nil {
		return dotEnvErr
	}

	return godotenv.Load(".env.template")
}

func main() {
	envErr := loadEnv()
	if envErr != nil {
		log.Fatal(".env and .env.template files not found!")
	}

	customHandler := handlers.CreateHandler()

	data.Connect()
	defer data.Close()

	fmt.Println("Server started on Port 3000")
	http.ListenAndServe(":3000", customHandler)
}
