package routes

import (
	"diver/models"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

var jobsChannel chan<- models.Job
var db *gorm.DB

func setJobsChannel(channel chan<- models.Job) {
	jobsChannel = channel
}

func setDatabase(database *gorm.DB) {
	db = database
}

func Setup(database *gorm.DB, channel chan models.Job, server *echo.Echo) {
	setDatabase(database)
	setJobsChannel(channel)
	setupTaskRoutes(server)
	setupJobRoutes(server)
	setupDisplayRoutes(server)
}

func setupTaskRoutes(server *echo.Echo) {
	taskRoutes := server.Group("/tasks")
	taskRoutes.GET("", GetTasks)
	taskRoutes.GET("/:id", GetTask)
	taskRoutes.PUT("/:id", UpdateTask)
	taskRoutes.DELETE("/:id", DeleteTask)
	taskRoutes.POST("/run", RunTask)
	taskRoutes.POST("/save", SaveTask)
}

func setupJobRoutes(server *echo.Echo) {
	jobRoutes := server.Group("/jobs")
	jobRoutes.GET("", GetJobs)
}

func setupDisplayRoutes(server *echo.Echo) {
	server.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Hello World")
	})
}
