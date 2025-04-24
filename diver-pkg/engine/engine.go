package engine

import (
	models "diver/models"
	"fmt"
	"time"
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

func task_request() {
	fmt.Println("Task Request")
}

func taskWorker(msg any) {
	fmt.Println("Received task")
	fmt.Println(msg)
	fmt.Println(time.Now())
}

// ingests tasks from engine channel
func run(engineChannel <-chan models.Task) {
	for msg := range engineChannel {
		taskWorker(msg)
	}
}

func setupEngine() chan models.Task {
	engineChannel := make(chan models.Task, 100)
	return engineChannel
}

func Start() chan models.Task {
	fmt.Println("Tasks Engine starting")
	engineChannel := setupEngine()
	go run(engineChannel)
	return engineChannel
}
