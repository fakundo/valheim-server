package server

import (
	"log"
	"valheim-server/valheim"

	socketio "github.com/googollee/go-socket.io"
)

const (
	// Outgoing events
	evtError     = "error"
	evtState     = "state"
	evtWorld     = "world"
	evtWorlds    = "worlds"
	evtAdmins    = "admins"
	evtBanned    = "banned"
	evtPermitted = "permitted"
	evtPerf      = "perf"
	evtOutput    = "output"
	// Incoming events
	evtAuth            = "auth"
	evtServerStart     = "server.start"
	evtServerStop      = "server.stop"
	evtWorldGet        = "world.get"
	evtWorldAdd        = "world.add"
	evtWorldsDelete    = "worlds.delete"
	evtAdminAdd        = "admin.add"
	evtAdminsDelete    = "admins.delete"
	evtBannedAdd       = "banned.add"
	evtBannedDelete    = "banned.delete"
	evtPermittedAdd    = "permitted.add"
	evtPermittedDelete = "permitted.delete"
)

func registerEventHandlers() {
	sio.OnConnect("/", func(s socketio.Conn) error {
		return nil
	})

	sio.OnEvent("/", evtAuth, func(s socketio.Conn, p string) {
		err := authenticate(p)
		emitError(s, err)
		if err == nil {
			authorize(s)
			emitInitialData(s)
		}
	})

	sio.OnEvent("/", evtServerStart, requireAuth(func(s socketio.Conn, opts valheim.StartOptions) {
		go vh.Start(opts, broadcastErrorAndState)
	}))

	sio.OnEvent("/", evtServerStop, requireAuth(func(s socketio.Conn) {
		go vh.Stop(broadcastErrorAndState)
	}))

	sio.OnEvent("/", evtWorldGet, requireAuth(func(s socketio.Conn, name string) {
		emitWorld(s, name)
	}))

	sio.OnEvent("/", evtWorldAdd, requireAuth(func(s socketio.Conn, world valheim.World) {
		emitErrorOrBroadcastWorldList(s, vh.AddWorld(&world))
	}))

	sio.OnEvent("/", evtWorldsDelete, requireAuth(func(s socketio.Conn, names []string) {
		emitErrorOrBroadcastWorldList(s, vh.DeleteWorlds(names))
	}))

	sio.OnEvent("/", evtAdminAdd, requireAuth(func(s socketio.Conn, item string) {
		emitErrorOrBroadcastAdminList(s, vh.AddAdmin(item))
	}))

	sio.OnEvent("/", evtAdminsDelete, requireAuth(func(s socketio.Conn, items []string) {
		emitErrorOrBroadcastAdminList(s, vh.DeleteAdmins(items))
	}))

	sio.OnEvent("/", evtBannedAdd, requireAuth(func(s socketio.Conn, item string) {
		emitErrorOrBroadcastBannedList(s, vh.AddBanned(item))
	}))

	sio.OnEvent("/", evtBannedDelete, requireAuth(func(s socketio.Conn, items []string) {
		emitErrorOrBroadcastBannedList(s, vh.DeleteBanned(items))
	}))

	sio.OnEvent("/", evtPermittedAdd, requireAuth(func(s socketio.Conn, item string) {
		emitErrorOrBroadcastPermittedList(s, vh.AddPermitted(item))
	}))

	sio.OnEvent("/", evtPermittedDelete, requireAuth(func(s socketio.Conn, items []string) {
		emitErrorOrBroadcastPermittedList(s, vh.DeletePermitted(items))
	}))

	sio.OnError("/", func(s socketio.Conn, err error) {
		log.Println("Unhandled error:", err)
	})
}
