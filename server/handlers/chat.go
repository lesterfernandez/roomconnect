package handlers

import (
	"fmt"
	"net/http"

	"errors"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
	"github.com/lesterfernandez/roommate-finder/server/data"
)

func (s *Server) handleChat(w http.ResponseWriter, r *http.Request) {

	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error upgrading connection", err)
		return
	}
	defer conn.Close()

	// Read token payload with username
	verifiedToken := r.Context().Value(ContextKey).(*jwt.Token)

	subject, tokenErr := verifiedToken.Claims.GetSubject()
	if tokenErr != nil {
		respondWithError(w, "Invalid Token", http.StatusUnauthorized)
		return
	}

	// Subscribe to Redis channel and receive messages for user
	go data.JoinChannel(conn, subject)

	for {
		chatMessage := data.ChatMessage{Type: "message"}

		if err := conn.ReadJSON(&chatMessage); err != nil {
			fmt.Println("Bad Request,", err)
			break
		}

		if verifyErr := verifyMessage(&chatMessage, subject); verifyErr != nil {
			fmt.Println(verifyErr)
			continue
		}

		data.SendMessage(chatMessage)
	}
}

func verifyMessage(message *data.ChatMessage, username string) error {
	if message.From != username {
		return errors.New("incoming ChatMessage \"from\" field does not match username")
	}

	return nil
}
