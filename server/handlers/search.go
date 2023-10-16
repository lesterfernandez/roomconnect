package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/lesterfernandez/roommate-finder/server/data"
)

func SearchUsers(w http.ResponseWriter, res *http.Request) {
	field := res.URL.Query().Get("field")
	query := res.URL.Query().Get("query")

	if len(field) == 0 || len(query) == 0 {
		respondWithError(w, "Field/Query missing", http.StatusBadRequest)
	}

	users := data.SearchUsers(field, query)

	usersJson, err := json.Marshal(users)

	if err != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		fmt.Println("SearchUsers", err.Error())
		return
	}
	w.Write(usersJson)
}
