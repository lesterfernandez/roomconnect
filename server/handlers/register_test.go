package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/lesterfernandez/roommate-finder/server/data"
	"github.com/lesterfernandez/roommate-finder/server/token"
)

func TestRegister(t *testing.T) {
	t.Run("New User Created", func(t *testing.T) {

		mockUserRepo := data.UserRepo{
			CreateUser: func(newUser data.RegisterBody) error { return nil },
			UserExists: func(username string) (bool, error) { return false, nil },
		}

		r := CreateHandler(&Server{User: &mockUserRepo})

		testUser := data.RegisterBody{
			ProfilePic:  "url",
			DisplayName: "hank",
			Budget:      3,
			Gender:      "Male",
			Cleanliness: 3,
			Loudness:    3,
			Coed:        true,
			Username:    "hank",
			Password:    "turtle",
		}

		reqBody, _ := json.Marshal(testUser)
		req := httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(reqBody))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		res := w.Result()
		resBody, _ := io.ReadAll(res.Body)
		tokenRes := data.TokenMessage{}
		unmarshalErr := json.Unmarshal(resBody, &tokenRes)

		if unmarshalErr != nil {
			t.Fatalf("Could not parse response: %v\n", unmarshalErr)
		}

		//TODO: Check for status code once we set that up

		newToken, _ := token.CreateJWT(testUser.Username)
		if newToken != tokenRes.Token {
			t.Fatalf("JWT did not generate correctly")
		}
	})

	t.Run("User already exists", func(t *testing.T) {
		mockUserRepo := data.UserRepo{
			CreateUser: func(newUser data.RegisterBody) error { return nil },
			UserExists: func(username string) (bool, error) { return true, nil },
		}

		r := CreateHandler(&Server{User: &mockUserRepo})

		reqBody, _ := json.Marshal(data.RegisterBody{
			ProfilePic:  "url",
			DisplayName: "hank",
			Budget:      3,
			Gender:      "Male",
			Cleanliness: 3,
			Loudness:    3,
			Coed:        true,
			Username:    "hank",
			Password:    "turtle",
		})
		req := httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(reqBody))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		res := w.Result()
		resBody, _ := io.ReadAll(res.Body)
		errorRes := data.ApiError{}
		unmarshalErr := json.Unmarshal(resBody, &errorRes)

		if unmarshalErr != nil {
			t.Fatalf("ApiError Unmarshal Error: %v\n", unmarshalErr)
		}
	})

}
