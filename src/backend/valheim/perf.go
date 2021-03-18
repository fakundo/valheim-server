package valheim

import "valheim-server/util"

// UpdatePerfData updates performance information of the running game process
func (v *Valheim) UpdatePerfData(p *util.PerfData) {
	if v.status == sRunning || v.status == sStopping {
		p.Update(v.proc.Process.Pid)
	} else {
		p.Reset()
	}
}
