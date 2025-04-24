package routes

import (
	"diver/models"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

var taskChannel chan<- models.Task
var db *gorm.DB

func setTaskChannel(channel chan<- models.Task) {
	taskChannel = channel
}

func setDatabase(database *gorm.DB) {
	db = database
}

func Setup(database *gorm.DB, channel chan models.Task, server *echo.Echo) {
	setDatabase(database)
	setTaskChannel(channel)
	setupTaskRoutes(server)
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

func setupDisplayRoutes(server *echo.Echo) {
	server.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Hello World")
	})
}
