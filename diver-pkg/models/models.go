package models

import (
	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
	"time"
)

type Task struct {
	ID         uuid.UUID `gorm:"type:uuid" param:"id"`
	Name       string
	Type       string
	Parameters datatypes.JSON `json:"Parameters"`
	CreatedAt  time.Time `json:"created_at,omitempty"`
	UpdatedAt  time.Time `json:"updated_at,omitempty"`
}

type Job struct {
	ID        uuid.UUID `gorm:"type:uuid" param:"id"`
	Task      Task      `gorm:"embedded;embeddedPrefix:task"`
	Start     time.Time `json:"start,omitempty"`
	End       time.Time `json:"end,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}

type Dive struct {
}

func (t *Task) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}

func (t *Job) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}
