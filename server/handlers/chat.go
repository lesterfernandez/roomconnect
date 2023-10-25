package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

func (s *Server) handleChat(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error upgrading connection", err)
	}
	defer conn.Close()

	for {
		m, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("error reading message:", err)
			continue
		}

		err = conn.WriteMessage(m, msg)
		if err != nil {
			fmt.Println("error writing message:", err)
			continue
		}
	}
}
