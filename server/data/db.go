package data

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

func GetenvWithFallback(key string, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		val = fallback
	}
	return val
}

func ConnectDatabase() {
	name := GetenvWithFallback("POSTGRES_DB", "rmf-db1")
	password := GetenvWithFallback("POSTGRES_PASSWORD", "secret")
	host := GetenvWithFallback("POSTGRES_HOST", "localhost")
	port := GetenvWithFallback("POSTGRES_PORT", "5001")
	user := GetenvWithFallback("POSTGRES_USER", "postgres")

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

func CloseDatabase() {
	pool.Close()
}
