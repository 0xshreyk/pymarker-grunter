package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type UserRequest struct {
	Code string `json:"code" bson:"Code"`
}

func main() {
	http.HandleFunc("/api/run", func(w http.ResponseWriter, r *http.Request) {
		var user UserRequest
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			// return HTTP 400 bad request
		}
		fmt.Printf("Username is %s\n", user.Code)
	})
	http.ListenAndServe(":8000", nil)
}