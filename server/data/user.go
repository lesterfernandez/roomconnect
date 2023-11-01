package data

import (
	"context"

	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
)

type UserRepo struct {
	CreateUser   func(newUser RegisterBody) error
	GetUser      func(username string) (*UserProfile, error)
	UserExists   func(username string) (bool, error)
	IsValidLogin func(username string, password string) (bool, error)
	EditUser     func(user *UserProfile, username string) (*UserProfile, error)
}

func NewUserRepo() *UserRepo {
	return &UserRepo{
		CreateUser:   createUser,
		GetUser:      getUser,
		UserExists:   userExists,
		IsValidLogin: isValidLogin,
		EditUser:     editUser,
	}
}

type UserAttributes struct {
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

type UserProfile struct {
	Username string `db:"username" json:"username"`
	UserAttributes
}

type RegisterBody struct {
	UserCredentials
	UserAttributes
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

func createUser(newUser RegisterBody) error {
	passhash, hashError := HashPassword(newUser.Password)

	if hashError != nil {
		return hashError
	}

	tag, err := pool.Exec(context.Background(),
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

func getUser(username string) (*UserProfile, error) {
	rows, queryErr := pool.Query(context.Background(), `
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
	if queryErr != nil {
		return &UserProfile{}, queryErr
	}

	userProfile, collectErr := pgx.CollectOneRow(rows, pgx.RowToAddrOfStructByName[UserProfile])
	if collectErr != nil {
		return &UserProfile{}, collectErr
	}

	return userProfile, nil
}

func userExists(username string) (bool, error) {
	var count int
	err := pool.QueryRow(context.Background(), "SELECT COUNT(*) FROM users WHERE username=$1", username).Scan(&count)
	if err != nil {
		return false, err
	}

	return count == 1, nil
}

func isValidLogin(username string, password string) (bool, error) {
	var passhash string

	queryErr := pool.QueryRow(context.Background(), "SELECT passhash FROM users WHERE username=$1", username).Scan(&passhash)
	if queryErr != nil {
		return false, queryErr
	}

	compareError := bcrypt.CompareHashAndPassword([]byte(passhash), []byte(password))
	if compareError != nil {
		return false, compareError
	}

	return true, nil
}

func editUser(user *UserProfile, username string) (*UserProfile, error) {
	updateQuery := `UPDATE users SET profile_pic = $1, display_name = $2, budget_tier = $3, gender = $4,
	clean_tier = $5, loud_tier = $6, coed = $7
	WHERE username = $8`

	queryValues := []any{user.ProfilePic, user.DisplayName, user.Budget, user.Gender, user.Cleanliness, user.Loudness, user.Coed, username}
	tag, err := pool.Exec(context.Background(), updateQuery, queryValues...)
	if err != nil || !tag.Update() {
		return &UserProfile{}, err
	}

	updatedUser, err := getUser(username)
	if err != nil {
		return &UserProfile{}, err
	}
	return updatedUser, nil
}
