package database

import (
	models "diver/models"
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
)

func CreateDatabase() *gorm.DB {
	fmt.Println("Database Started")
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	// migrate
	db.AutoMigrate(&models.Task{})
	db.AutoMigrate(&models.Job{})

	return db

	// update
	// db.Model(&task).Update("Name", "newTask")
	// update -update multiple fields
	// db.Model(&task).Updates(models.Task{Name: "AnotherName", Type: "differentTask"})
	// db.Model(&task).Updates(map[string]interface{}{"Name": "FinalName", "Type": "finalTask"})

	// delete
	// db.Delete(&task, 1)
}
