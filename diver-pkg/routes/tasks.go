package routes

import (
	models "diver/models"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"gorm.io/datatypes"
)

func response(message string) *Response {
	return &Response{
		Message: message,
	}
}

type Response struct {
	Message string `json:"message" xml:"message"`
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

	return c.JSON(http.StatusOK, map[string]any{
		"results": tasks,
	})
}

func RunTask(c echo.Context) error {

	t := new(models.Task)
	if err := c.Bind(t); err != nil {
		return c.JSON(http.StatusBadRequest, response("Unable to run task"))
	}

	task := models.Task{
		Name:       t.Name,
		Type:       t.Type,
		Parameters: t.Parameters,
	}

	job := models.Job{
		Task: task,
	}

	// create job in database
	result := db.Create(&job)
	fmt.Println(result)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, response("Failed to Run Task"))
	}

	jobsChannel <- job

	return c.JSON(http.StatusOK, result)
}

func SaveTask(c echo.Context) error {
	fmt.Println("SaveTask")
	verifyTask := new(models.Task)
	if err := c.Bind(verifyTask); err != nil {
		return c.JSON(http.StatusBadRequest, response("Bad Request"))
	}

	jsonParams, err := json.Marshal(verifyTask.Parameters)
	if err != nil {
		return c.JSON(http.StatusBadRequest, response("Error marshaling parameters"))
	}

	task := models.Task{
		Name:       verifyTask.Name,
		Type:       verifyTask.Type,
		Parameters: datatypes.JSON(jsonParams),
	}

	result := db.Create(&task)

	fmt.Println("Result of creating task")
	fmt.Println(task)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, response("Failed to save task"))
	}

	return c.JSON(http.StatusOK, response("Task Saved"))
}

func UpdateTask(c echo.Context) error {
	return c.JSON(http.StatusOK, response("Task Updated"))
}

func DeleteTask(c echo.Context) error {
	taskId := c.Param("id")
	fmt.Println("Deleting task")
	fmt.Println(taskId)
	uuid, _ := uuid.Parse(taskId)
	db.Delete(&models.Task{}, uuid)
	return c.JSON(http.StatusOK, response("Task Deleted"))
}
