package server

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"valheim-server/valheim"

	socketio "github.com/googollee/go-socket.io"
)

var (
	vh  valheim.Valheim
	sio *socketio.Server
)

// Run server
func Run() error {
	ex, err := os.Executable()
	if err != nil {
		return err
	}

	sio, err = socketio.NewServer(nil)
	if err != nil {
		return err
	}

	registerEventHandlers()
	runWorkers()

	go sio.Serve()
	defer sio.Close()
	go http.Handle("/socket.io/", sio)
	publicPath := filepath.Join(filepath.Dir(ex), "public")
	http.Handle("/", http.FileServer(http.Dir(publicPath)))
	log.Println("Serving at localhost:8000...")
	return http.ListenAndServe(":8000", nil)
}
