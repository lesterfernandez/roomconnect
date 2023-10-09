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
	Username    string `db:"username"`
	ProfilePic  string `db:"profile_pic"`
	DisplayName string `db:"display_name"`
	Budget      int    `db:"budget_tier"`
	Gender      string `db:"gender"`
	Cleanliness int    `db:"clean_tier"`
	Loudness    int    `db:"loud_tier"`
	Coed        bool   `db:"coed"`
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
		fmt.Println("Error hashing password for user:", newUser.Username)
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
            coed
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
		newUser.Username,
		passhash,
		newUser.DisplayName,
		newUser.Gender,
		newUser.Cleanliness,
		newUser.Budget,
		newUser.Loudness,
		newUser.Coed)

	if err != nil && !tag.Insert() {
		fmt.Println("Error while creating user: ", err.Error())
		return err
	}

	fmt.Println("Successfully created user:", newUser.Username)

	return nil
}

func GetUser(username string) UserProfile {
	rows, _ := db.Query(context.Background(), `
		SELECT  username, 
				display_name, 
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

func UserExists(username string) bool {
	var count int
	err := db.QueryRow(context.Background(), "SELECT COUNT(*) FROM users WHERE username=$1", username).Scan(&count)

	if err != nil {
		fmt.Println("Error while checking for existing user", err.Error())
		return false
	}

	return count == 1
}

func IsValidLogin(username string, password string) bool {
	var passhash string

	queryErr := db.QueryRow(context.Background(), "SELECT passhash FROM users WHERE username=$1", username).Scan(&passhash)

	if queryErr != nil {
		fmt.Println("Error querying for user:", username, ".", queryErr.Error())
		return false
	}

	compareError := bcrypt.CompareHashAndPassword([]byte(passhash), []byte(password))
	if compareError != nil {
		fmt.Println("Error: Password is not correct.", compareError.Error())
		return false
	}

	return true
}
