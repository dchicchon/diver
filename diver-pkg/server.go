package main

import (
	engine "diver/engine"
	models "diver/models"
	routes "diver/routes"
	database "diver/startup"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
	"net/http"
)

func setupDatabase() *gorm.DB {
	newDB := database.CreateDatabase()
	return newDB
}

func setupMiddleware(server *echo.Echo) {
	server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
}

func setupEngine() chan models.Job {
	engineChannel := engine.Start()
	return engineChannel
}

func setupRoutes(server *echo.Echo, engineChannel chan models.Job, database *gorm.DB) {
	routes.Setup(database, engineChannel, server)
}

// create server
func main() {
	server := echo.New()
	server.Debug = true
	server.Logger.Debug("Starting Server...")

	setupMiddleware(server)

	database := setupDatabase()
	engineChannel := setupEngine() // should return the engine channel?
	setupRoutes(server, engineChannel, database)

	if err := server.Start(":1323"); err != nil && err != http.ErrServerClosed {
		server.Logger.Fatal(err)
	}
}
