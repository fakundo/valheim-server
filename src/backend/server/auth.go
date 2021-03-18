package server

import (
	"valheim-server/env"
	"valheim-server/util"

	middleware "github.com/fakundo/go-middleware"
	socketio "github.com/googollee/go-socket.io"
)

const (
	authContext = "authorized"
	authRoom    = "authorized-clients"
)

func authenticate(password string) error {
	auth := password == env.DashboardPassword
	if !auth {
		return util.AuthError
	}
	return nil
}

func authorize(s socketio.Conn) {
	s.SetContext(authContext)
	s.Join(authRoom)
}

func authorized(s socketio.Conn) bool {
	return s.Context() == authContext
}

func broadcastToAuthorized(event string, arg ...interface{}) {
	sio.BroadcastToRoom("", authRoom, event, arg...)
}

func hasAuthorizedClients() bool {
	return sio.RoomLen("", authRoom) > 0
}

var requireAuth = middleware.Create(func(s socketio.Conn, next func()) {
	if authorized(s) {
		next()
	} else {
		emitError(s, util.AuthError)
	}
})
