package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/lesterfernandez/roommate-finder/server/data"
)

var searchFields = map[string]string{
	"budget":      "budget_tier",
	"cleanliness": "clean_tier",
	"gender":      "gender",
	"coed":        "coed",
	"loudness":    "loudness",
}

func SearchUsers(w http.ResponseWriter, res *http.Request) {
	queryFields := [][2]string{}

	order := [...]string{
		"budget",
		"cleanliness",
		"gender",
		"coed",
		"loudness"}

	for _, field := range order {
		queryValue := res.URL.Query().Get(field)
		if queryValue != "" {
			queryFields = append(queryFields, [2]string{searchFields[field], queryValue})
		}
	}

	users := data.SearchUsers(queryFields)

	usersJson, err := json.Marshal(users)

	if err != nil {
		respondWithError(w, "Internal Server Error", http.StatusInternalServerError)
		fmt.Println("SearchUsers", err.Error())
		return
	}
	w.Write(usersJson)
}
