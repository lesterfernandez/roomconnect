package data

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/gorilla/websocket"
	"github.com/jackc/pgx/v5"
)

type ChatMessage struct {
	Type    string `json:"type"`
	From    string `db:"from_user" json:"from"`
	To      string `db:"to_user" json:"to"`
	Content string `db:"content" json:"content"`
}

func JoinChannel(conn *websocket.Conn, username string) {
	sub := redisClient.Subscribe(context.Background(), username)
	defer sub.Close()

	go loadMessages(conn, username)

	chatMessage := ChatMessage{}
	for {
		// Listen for new messages
		msg, err := sub.ReceiveMessage(context.Background())
		if err != nil {
			fmt.Println(err.Error())
		}

		if err := json.Unmarshal([]byte(msg.Payload), &chatMessage); err != nil {
			fmt.Println(err.Error())
		}

		writeErr := conn.WriteJSON(chatMessage)
		if writeErr != nil {
			fmt.Println(err.Error())
		}
	}
}

func SendMessage(msg ChatMessage) error {
	// Store message
	storeErr := storeMessage(msg)
	if storeErr != nil {
		panic(storeErr)
	}

	// Publish to redis in JSON form
	msgJson, marshalErr := json.Marshal(msg)
	if marshalErr != nil {
		return marshalErr
	}

	cmd := redisClient.Publish(context.Background(), msg.To, msgJson)

	err := cmd.Err()
	if err != nil {
		return err
	}

	return nil
}

func storeMessage(message ChatMessage) error {
	sqlQuery := `
		INSERT INTO messages (
			from_user,
			to_user,
			content
		)
		VALUES ($1,$2,$3)
	`
	fmt.Println(message)
	tag, err := pool.Exec(context.Background(), sqlQuery, message.From, message.To, message.Content)

	if err != nil && !tag.Insert() {
		return err
	}
	return nil
}

func loadMessages(conn *websocket.Conn, username string) {
	sqlQuery := `
		SELECT 	from_user,
				to_user,
				content
		FROM messages
		WHERE to_user=$1
		LIMIT 50
		`

	rows, err := pool.Query(context.Background(), sqlQuery, &username)
	if err != nil {
		panic(err)
	}

	messages, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByNameLax[ChatMessage])
	if err != nil {
		fmt.Println("Error while querying for messages stored. user:", username)
		return
	}

	conn.WriteJSON(messages)
}
