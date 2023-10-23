package data

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
)

type RegisterBody struct {
	ProfilePic  string
	DisplayName string
	Budget      int
	Gender      string
	Cleanliness int
	Loudness    int
	Coed        bool
	Username    string
	Password    string
}

type UserProfile struct {
	ProfilePic  string `db:"profile_pic" json:"profilePic"`
	DisplayName string `db:"display_name" json:"displayName"`
	Budget      int    `db:"budget_tier" json:"budget"`
	Gender      string `db:"gender" json:"gender"`
	Cleanliness int    `db:"clean_tier" json:"cleanliness"`
	Loudness    int    `db:"loud_tier" json:"loudness"`
	Coed        bool   `db:"coed" json:"coed"`
}

type UserCredentials struct {
	Username string
	Password string
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

func CreateUser(newUser RegisterBody) error {
	passhash, hashError := HashPassword(newUser.Password)

	if hashError != nil {
		return hashError
	}

	tag, err := db.Exec(context.Background(),
		`INSERT INTO users 
        (
            username, 
            passhash, 
            display_name, 
            gender, 
            clean_tier, 
            budget_tier, 
            loud_tier, 
            coed,
			profile_pic
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
		newUser.Username,
		passhash,
		newUser.DisplayName,
		newUser.Gender,
		newUser.Cleanliness,
		newUser.Budget,
		newUser.Loudness,
		newUser.Coed,
		newUser.ProfilePic)

	if err != nil && !tag.Insert() {
		return err
	}

	return nil
}

func GetUser(username string) UserProfile {
	rows, _ := db.Query(context.Background(), `
		SELECT  display_name, 
				gender, 
				profile_pic,
				clean_tier, 
				budget_tier, 
				loud_tier, 
				coed
		FROM users
		WHERE username=$1
	`, username)

	userProfile, err := pgx.CollectOneRow(rows, pgx.RowToAddrOfStructByName[UserProfile])

	if err != nil {
		fmt.Println(username, "not found")
		return UserProfile{}
	}

	return *userProfile
}

func UserExists(username string) (bool, error) {
	var count int
	err := db.QueryRow(context.Background(), "SELECT COUNT(*) FROM users WHERE username=$1", username).Scan(&count)

	if err != nil {
		return false, err
	}

	return count == 1, nil
}

func IsValidLogin(username string, password string) (bool, error) {
	var passhash string

	queryErr := db.QueryRow(context.Background(), "SELECT passhash FROM users WHERE username=$1", username).Scan(&passhash)

	if queryErr != nil {
		return false, queryErr
	}

	compareError := bcrypt.CompareHashAndPassword([]byte(passhash), []byte(password))
	if compareError != nil {
		return false, compareError
	}

	return true, nil
}
