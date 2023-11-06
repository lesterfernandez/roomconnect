package handlers

import (
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
	"github.com/lesterfernandez/roommate-finder/server/data"
)

func (s *Server) handleChat(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error upgrading connection", err)
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

	// Listen for messages by user
	for {
		chatMessage := data.ChatMessage{}

		err := conn.ReadJSON(&chatMessage)
		if err != nil {
			respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		data.SendMessage(chatMessage)
	}
}
