package server

import (
	"time"
	"valheim-server/util"
)

var (
	perf = make([]util.PerfData, 30)
)

func runWorkers() {
	go runOutputWorker()
	go runPerfWorker()
	go runSyncWorker()
}

func runOutputWorker() {
	buf := make([]byte, 1024)
	out := vh.GetOutput()
	for {
		time.Sleep(time.Millisecond * 200)
		if *out == nil {
			continue
		}
		n, err := (*out).Read(buf)
		if err != nil || n == 0 || !hasAuthorizedClients() {
			continue
		}
		broadcastToAuthorized(evtOutput, string(buf[:n]))
	}
}

func runPerfWorker() {
	for {
		perf = append(perf[1:], perf[:1][0])
		vh.UpdatePerfData(&perf[len(perf)-1])
		broadcastToAuthorized(evtPerf, perf)
		time.Sleep(time.Second * 2)
	}
}

// @todo detect changes made by game
func runSyncWorker() {
	for {
		if hasAuthorizedClients() {
			broadcastToAuthorized(evtWorlds, vh.GetWorldList())
			broadcastToAuthorized(evtAdmins, vh.GetAdminList())
			broadcastToAuthorized(evtBanned, vh.GetBannedList())
			broadcastToAuthorized(evtPermitted, vh.GetPermittedList())
		}
		time.Sleep(time.Second * 10)
	}
}
