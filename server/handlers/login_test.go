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
			IsValidLogin: func(username, password string) bool { return false },
		}

		r := CreateHandler(&Server{User: &MockUserRepo})

		reqBody, _ := json.Marshal(data.UserCredentials{
			Username: "Hank",
			Password: "Password",
		})
		req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewReader(reqBody))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		res := w.Result()
		resBody, _ := io.ReadAll(res.Body)
		apiErr := data.ApiError{}
		unmarshalErr := json.Unmarshal(resBody, &apiErr)

		if unmarshalErr != nil {
			t.Fatalf("Unmarshal Error: %v\n", unmarshalErr)
		}

		t.Logf("Received ApiErr: %v\n", apiErr.ErrorMessage)

	})

	t.Run("Valid Login", func(t *testing.T) {
		mockRepo := data.UserRepo{
			IsValidLogin: func(username, password string) bool { return true },
		}

		r := CreateHandler(&Server{User: &mockRepo})

		reqBody, _ := json.Marshal(data.UserCredentials{
			Username: "Download",
			Password: "Audio",
		})
		req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewReader(reqBody))
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		res := w.Result()
		resBody, _ := io.ReadAll(res.Body)
		tokenRes := data.TokenMessage{}
		unmarshalErr := json.Unmarshal(resBody, &tokenRes)

		if unmarshalErr != nil {
			t.Fatalf("Unmarshal Error: %v\n", unmarshalErr)
		}
	})
}
