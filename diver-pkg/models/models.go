package models

import (
	"github.com/google/uuid"
	"time"
	// "gorm.io/datatypes"
	"gorm.io/gorm"
)

type Model struct {
	ID        uuid.UUID `gorm:"type:uuid" param:"id"`
	CreatedAt time.Time `json:created_at,omitempty`
	UpdatedAt time.Time `json:updated_at,omitempty`
}

type Task struct {
	gorm.Model
	Name string
	Type string
	// Parameters datatypes.JSON

}

type Job struct {
	gorm.Model
	Task  Task
	Start time.Time
	End   time.Time
}

type Dive struct {
}

func (t *Model) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}
