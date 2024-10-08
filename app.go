package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) SaveTasks(tasks []Task) {

	_, err := os.Create("task.csv")
	if err != nil {
		log.Fatal(err)
	}

	file, err := os.OpenFile("task.csv", os.O_RDWR|os.O_APPEND, 0666)

	if err != nil {
		log.Fatal(err)
	}

	for i := 0; i < len(tasks); i++ {
		v := tasks[i]
		file.Write([]byte(strconv.Itoa(v.Id) + ";" + v.Task + "\n"))
	}

}

func (a *App) BringTasks() string {

	file, err := os.ReadFile("task.csv")
	if err != nil {
		log.Fatal(err)
	}
	task := []byte(file)
	fmt.Sprintf("%s", task)
	return fmt.Sprintf("%s", task)

}
