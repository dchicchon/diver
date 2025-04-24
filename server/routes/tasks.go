package routes

import (
	models "diver/models"
	"fmt"
	// "io"
	// "log"
	"github.com/labstack/echo/v4"
	"net/http"
)

type Response struct {
	Results models.Task
}

// maybe this should be a class or something?
func GetTask(c echo.Context) error {
	return c.JSON(http.StatusOK, "Get Task")
}

func GetTasks(c echo.Context) error {
	var tasks []models.Task

	result := db.Find(&tasks)
	// fmt.Println(result)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "Unable to retrieve tasks")
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"results": tasks,
	})
}

func RunTask(c echo.Context) error {
	exampleTask := models.Task{
		Name: "Example Task",
	}

	taskChannel <- exampleTask

	// we should be sending our run task to our engine channel
	// running a task should send it to our engine to process
	// r := new(Task)
	// if err := c.Bind(r); err != nil {
	// 	return c.String(http.StatusBadRequest, "bad request")
	// }

	// request := Task{
	// 	Name:        r.Name,
	// 	Url:         r.Url,
	// 	Method:      r.Method,
	// 	RequestBody: r.RequestBody,
	// }
	// if len(r.Url) == 0 {
	// 	return c.JSON(http.StatusBadRequest, "URL missing")
	// }

	// what this should do is send our task to our tasks engine to run

	// jsonData, err := json.Marshal(request.RequestBody)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Print("URL:")
	// fmt.Println(request.Url)
	// fmt.Print("METHOD:")
	// fmt.Println(request.Method)
	// fmt.Print("RequestBody:")
	// fmt.Println(request.RequestBody)
	// // resp, err := http.Post(request.Url, "application/json", bytes.NewBuffer(jsonData))
	// resp, err := http.Get(request.Url)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer resp.Body.Close()

	// fmt.Println(resp)

	// bodyBytes, err := io.ReadAll(resp.Body)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	return c.JSON(http.StatusOK, "Running Task")
	// return c.JSON(http.StatusOK, string(bodyBytes))
}

func SaveTask(c echo.Context) error {
	fmt.Println("SaveTask")
	verifyTask := new(models.Task)
	if err := c.Bind(verifyTask); err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	task := models.Task{
		Name: verifyTask.Name,
		Type: verifyTask.Type,
		// Parameters: verifyTask.Parameters,
	}
	result := db.Create(&task)

	if result.Error != nil {
		fmt.Println("Save task error:", result.Error)
		return c.JSON(http.StatusBadRequest, "Failed to Save Task")
	}

	return c.JSON(http.StatusOK, "Task Saved")
}

func UpdateTask(c echo.Context) error {
	return c.JSON(http.StatusOK, "Update Task")
}

func DeleteTask(c echo.Context) error {
	taskId := c.Param("id")
	fmt.Println("Deleting task")
	fmt.Println(taskId)
	return c.JSON(http.StatusOK, "Delete Task")
}
