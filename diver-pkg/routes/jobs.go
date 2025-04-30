package routes

import (
	"diver/models"
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
)

func GetJobs(c echo.Context) error {
	var jobs []models.Job
	result := db.Find(&jobs)
	fmt.Println(result)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "Unable to retrieve jobs")
	}

	return c.JSON(http.StatusOK, map[string]any{
		"results": jobs,
	})
}
