package main

import (
	"log"
	"valheim-server/server"
)

func main() {
	log.Fatalln(server.Run())
}
