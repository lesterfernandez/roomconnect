package data

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
)

var redisClient *redis.Client

func ConnectRedis() {
	host := GetenvWithFallback("REDIS_HOST", "localhost")
	port := GetenvWithFallback("REDIS_PORT", "5002")

	redisClient = redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", host, port),
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	_, err := redisClient.Ping(context.Background()).Result()

	if err != nil {
		panic("Error while connecting to Redis: " + err.Error())
	}
}

func CloseRedis() {
	redisClient.Close()
}
