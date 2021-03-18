package server

import (
	"valheim-server/util"

	socketio "github.com/googollee/go-socket.io"
)

func emitError(s socketio.Conn, err error) {
	if err != nil {
		s.Emit(evtError, util.NormalizeError(err))
	}
}

func broadcastError(err error) {
	if err != nil {
		broadcastToAuthorized(evtError, util.NormalizeError(err))
	}
}

func emitInitialData(s socketio.Conn) {
	s.Emit(evtState, vh.GetState())
	s.Emit(evtWorlds, vh.GetWorldList())
	s.Emit(evtAdmins, vh.GetAdminList())
	s.Emit(evtBanned, vh.GetBannedList())
	s.Emit(evtPermitted, vh.GetPermittedList())
}

func broadcastErrorAndState(err error) {
	broadcastError(err)
	broadcastToAuthorized(evtState, vh.GetState())
}

func emitWorld(s socketio.Conn, name string) {
	world, err := vh.GetWorld(name)
	emitError(s, err)
	if err == nil {
		s.Emit(evtWorld, &world)
	}
}

func emitErrorOrBroadcastWorldList(s socketio.Conn, err error) {
	emitError(s, err)
	if err == nil {
		broadcastToAuthorized(evtWorlds, vh.GetWorldList())
	}
}

func emitErrorOrBroadcastAdminList(s socketio.Conn, err error) {
	emitError(s, err)
	if err == nil {
		broadcastToAuthorized(evtAdmins, vh.GetAdminList())
	}
}

func emitErrorOrBroadcastBannedList(s socketio.Conn, err error) {
	emitError(s, err)
	if err == nil {
		broadcastToAuthorized(evtBanned, vh.GetBannedList())
	}
}

func emitErrorOrBroadcastPermittedList(s socketio.Conn, err error) {
	emitError(s, err)
	if err == nil {
		broadcastToAuthorized(evtPermitted, vh.GetPermittedList())
	}
}
