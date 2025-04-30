package engine

import (
	"bytes"
	models "diver/models"
	"encoding/json"
	"fmt"
	"gorm.io/datatypes"
	// "io"
	"log"
	"net/http"
)

// what should be in a task?
// name
// runId
// start
// end

// should i keep a folder of tasks? then i will look for these tasks to run
// an output should have items that a task will output
// should record the time that it executed
// should record the status of the task

type Output struct {
}

func task_request(request datatypes.JSON) {
	fmt.Println("Task Request")
	fmt.Println(request)

	var data map[string]any

	if err := json.Unmarshal(request, &data); err != nil {
		fmt.Println("Error decoding json")
		return
	}

	var Url string
	var Method string
	// Access properties
	if val, ok := data["url"].(string); ok {
		if len(val) == 0 {
			fmt.Println("Error: url not provided")
		}
		fmt.Println("Url:", val)
		Url = val
	}

	if val, ok := data["method"].(string); ok { // JSON numbers -> float64
		if len(val) == 0 {
			fmt.Println("Error: method not provided")
		}
		fmt.Println("Method:", val)
		Method = val
	}
	if Method == "GET" {
		resp, err := http.Get(Url)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		// fmt.Println(resp)
		// bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		// fmt.Println(string(bodyBytes))
	} else if Method == "POST" {
		jsonData, err := json.Marshal(data["requestBody"])
		if err != nil {
			log.Fatal(err)
		}
		resp, err := http.Post(Url, "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		// bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		// fmt.Println(string(bodyBytes))
	}

}

func taskWorker() {
	// maybe a job could have multiple tasks? in our case we should just use it to work one task
}

func jobWorker(msg models.Job) {
	// we should create a new job based on the request
	fmt.Println("Received job")
	fmt.Println(msg.Task.Name)
	fmt.Println(msg.Task.Type)

	// TODO: error checking

	// TODO: pass to handler
	if msg.Task.Type == "request" {
		task_request(msg.Task.Parameters)
	}
	// TODO: once completed, get output

}

// ingests tasks from engine channel
func run(engineChannel <-chan models.Job) {
	for msg := range engineChannel {
		jobWorker(msg)
	}
}

func setupEngine() chan models.Job {
	engineChannel := make(chan models.Job, 100)
	return engineChannel
}

func Start() chan models.Job {
	fmt.Println("Tasks Engine starting")
	engineChannel := setupEngine()
	go run(engineChannel)
	return engineChannel
}
