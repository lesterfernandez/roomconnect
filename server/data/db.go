package data

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

func Connect() {
	name := os.Getenv("POSTGRES_DB")
	password := os.Getenv("POSTGRES_PASSWORD")
	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	user := os.Getenv("POSTGRES_USER")

	connectionString := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s", user, password, host, port, name)
	fmt.Println("Connecting to database URI:", connectionString)

	var poolErr error
	pool, poolErr = pgxpool.New(context.Background(), connectionString)

	if poolErr != nil {
		panic("Error while creating pool: " + poolErr.Error())
	}

	pingErr := pool.Ping(context.Background())

	if pingErr != nil {
		panic("Error while connecting: " + pingErr.Error())
	}

	fmt.Println("Successfully connected to database!")
}

func Close() {
	pool.Close()
}
