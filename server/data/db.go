package data

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

func Connect() {

	name := getEnv("POSTGRES_DB", "db")
	password := getEnv("POSTGRES_PASSWORD", "pass")
	host := getEnv("POSTGRES_HOST", "host")
	port := getEnv("POSTGRES_PORT", "5000")
	user := getEnv("POSTGRES_USER", "user")

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
