package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
	"github.com/lesterfernandez/roommate-finder/server/data"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handleMessage(username string, p []byte) bool {
	message := data.ChatMessage{Type: "message"}
	err := json.Unmarshal(p, &message)

	if err != nil {
		fmt.Println("invalid chat message:", err)
		return false
	}

	if message.From != username {
		fmt.Println("incoming ChatMessage \"from\" field does not match username")
		return false
	}

	data.SendMessage(message)
	return true
}

func (s *Server) handleChat(w http.ResponseWriter, r *http.Request) {
	verifiedToken := r.Context().Value(ContextKey).(*jwt.Token)
	subject, tokenErr := verifiedToken.Claims.GetSubject()
	if tokenErr != nil {
		respondWithError(w, "Invalid Token", http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error upgrading connection", err)
		return
	}
	defer conn.Close()

	go data.JoinChannel(conn, subject)

	for {
		_, p, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Error reading WS message", err)
			break
		}

		if handleMessage(subject, p) {
			continue
		}

		if string(p) == "PING" {
			conn.WriteMessage(websocket.TextMessage, []byte("PONG"))
			continue
		}

		fmt.Println("Unsupported message", string(p))
		break
	}
}
