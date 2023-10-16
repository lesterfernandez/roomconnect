package data

import (
	"context"
	"fmt"
	"strings"

	"github.com/jackc/pgx/v5"
)

var searchFields = map[string]string{
	"budget":      "budget_tier",
	"cleanliness": "clean_tier",
	"gender":      "gender",
	"coed":        "coed",
	"loudness":    "loudness",
}

func SearchUsers(field string, query string) []*UserProfile {
	searchField, ok := searchFields[strings.ToLower(field)]

	if !ok {
		fmt.Println("Invalid field!")
		return []*UserProfile{}
	}

	sqlQuery := fmt.Sprintf(`
		SELECT 	display_name,
				gender,
				profile_pic,
				clean_tier,
				budget_tier,
				loud_tier,
				coed
		FROM users
		WHERE %s=$1
		`, searchField)

	rows, err := db.Query(context.Background(), sqlQuery, &query)

	if err != nil {
		fmt.Println("Error searching for users in field:", searchField, "query:", query)
	}

	usersFound, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByName[UserProfile])

	if err != nil {
		fmt.Println("Error collecting rows in SearchUsers. query:", query, "field:", searchField, "Error:", err.Error())

		return []*UserProfile{}
	}

	return usersFound
}
