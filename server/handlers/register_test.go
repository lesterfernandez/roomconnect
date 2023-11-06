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

		payload := data.RegisterBody{
			UserProfile: data.UserProfile{
				Username:    "hanker",
				ProfilePic:  "url",
				DisplayName: "hank",
				Budget:      3,
				Gender:      "Male",
				Cleanliness: 3,
				Loudness:    3,
				Coed:        true,
			},
			Password: "turtle",
		}
		b, _ := json.Marshal(payload)

		req := httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(b))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		res, _ := io.ReadAll(w.Result().Body)

		errMsg := data.ApiError{}
		err := json.Unmarshal(res, &errMsg)
		if len(errMsg.ErrorMessage) > 0 {
			t.Fatalf("/register responded with error message %#v", errMsg)
		}
		if err != nil {
			t.Fatal("/register responded with invalid json", err)
		}

		tokenRes := data.TokenMessage{}
		_ = json.Unmarshal(res, &tokenRes)
		token, _ := token.CreateJWT(payload.Username)
		if token != tokenRes.Token {
			t.Fatalf("JWT did not generate correctly %v != %v", token, tokenRes.Token)
		}
	})

	t.Run("User already exists", func(t *testing.T) {
		mockUserRepo := data.UserRepo{
			CreateUser: func(newUser data.RegisterBody) error { return nil },
			UserExists: func(username string) (bool, error) { return true, nil },
		}
		r := CreateHandler(&Server{User: &mockUserRepo})

		b, _ := json.Marshal(data.RegisterBody{
			UserProfile: data.UserProfile{
				Username:    "bill12",
				ProfilePic:  "url",
				DisplayName: "Billy",
				Budget:      3,
				Gender:      "Male",
				Cleanliness: 3,
				Loudness:    3,
				Coed:        true,
			},
			Password: "turtle",
		})

		req := httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(b))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		res, _ := io.ReadAll(w.Result().Body)

		errMsg := data.ApiError{}
		err := json.Unmarshal(res, &errMsg)
		if err != nil {
			t.Fatal("/register responded with invalid json", err)
		}
		if len(errMsg.ErrorMessage) == 0 {
			t.Fatalf("/register did not respond with error message %#v", errMsg)
		}
	})

}
