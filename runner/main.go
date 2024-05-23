package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"

)

type UserRequest struct {
	Code string `json:"code" bson:"Code"`
}

func main() {
	http.HandleFunc("/api/run", func(w http.ResponseWriter, r *http.Request) {
		var user UserRequest
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			fmt.Println(err)
		} // checks for any error
		err = os.WriteFile("runner.py", []byte(user.Code), 0644) //Writes code to the file
		if err!= nil {
            fmt.Println(err)
        } // checks for any error

		cmd := exec.Command("python3", "runner.py")
		output, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
		}
		w.Write([]byte(string(output)))
	})
	http.ListenAndServe(":8000", nil)
}