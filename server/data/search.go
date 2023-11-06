package data

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

func SearchUsers(queryFields [][2]string, username string) ([]*UserProfile, error) {
	queryValues := []any{username}

	sqlQuery := `
		SELECT 	username,
				display_name,
				gender,
				profile_pic,
				clean_tier,
				budget_tier,
				loud_tier,
				coed
		FROM users WHERE username != $1 `

	// Add AND WHERE clauses in SQL string
	for idx, slice := range queryFields {
		field := slice[0]
		value := slice[1]

		// build clauses dynamically
		clause := "AND"
		sqlQuery += fmt.Sprintf("%s %s=$%d ", clause, field, idx+2)

		// store values in order
		queryValues = append(queryValues, value)
	}

	// spread values in order into query function
	rows, err := pool.Query(context.Background(), sqlQuery, queryValues...)
	if err != nil {
		return nil, err
	}

	usersFound, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByNameLax[UserProfile])
	if err != nil {
		return nil, err
	}

	return usersFound, nil
}
