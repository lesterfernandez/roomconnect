package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/lesterfernandez/roommate-finder/server/data"
)

func TestLogin(t *testing.T) {
	t.Run("Invalid Login: User Exists", func(t *testing.T) {
		MockUserRepo := data.UserRepo{
			IsValidLogin: func(username, password string) (bool, error) { return false, nil },
		}
		r := CreateHandler(&Server{User: &MockUserRepo})

		b, _ := json.Marshal(data.UserCredentials{
			Username: "Hank",
			Password: "Password",
		})
		req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewReader(b))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		res, _ := io.ReadAll(w.Result().Body)

		apiErr := data.ApiError{}
		err := json.Unmarshal(res, &apiErr)

		if err != nil {
			t.Fatalf("/login responded with invalid json: %#v\n", err)
		}
		if len(apiErr.ErrorMessage) == 0 {
			t.Fatalf("/login did not respond with an error message: %#v", string(res))
		}
	})

	t.Run("Valid Login", func(t *testing.T) {
		mockRepo := data.UserRepo{
			IsValidLogin: func(username, password string) (bool, error) { return true, nil },
		}
		r := CreateHandler(&Server{User: &mockRepo})

		reqBody, _ := json.Marshal(data.UserCredentials{
			Username: "Download",
			Password: "Audio",
		})
		req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewReader(reqBody))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		res, _ := io.ReadAll(w.Result().Body)

		tokenRes := data.TokenMessage{}
		err := json.Unmarshal(res, &tokenRes)

		if err != nil {
			t.Fatalf("/login responded with invalid json: %#v\n", string(res))
		}
		if len(tokenRes.Token) == 0 {
			t.Fatalf("/login did not respond with a token: %#v\n", string(res))
		}

		apiErr := data.ApiError{}
		if _ = json.Unmarshal(res, &apiErr); len(apiErr.ErrorMessage) > 0 {
			t.Fatalf("/login responded with error message: %#v\n", string(res))
		}
	})
}
