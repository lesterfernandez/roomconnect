package data

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

func Connect() {

	name := os.getEnv("POSTGRES_DB")
	password := os.getEnv("POSTGRES_PASSWORD")
	host := os.getEnv("POSTGRES_HOST")
	port := os.getEnv("POSTGRES_PORT")
	user := os.getEnv("POSTGRES_USER")

	connectionString := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s", user, password, host, port, name)
	fmt.Println("Connecting to database URI:", connectionString)

	var err error
	db, err = pgxpool.New(context.Background(), connectionString)

	db.Ping(context.Background())

	if err != nil {
		panic("Error while connecting: " + err.Error())
	}

	fmt.Println("Successfully connected to database!")
}

func Close() {
	db.Close()
}
