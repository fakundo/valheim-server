package valheim

// State contains information about game state
type State struct {
	Status  string
	Options StartOptions
}

// GetStatusString returns status name
func (v *Valheim) GetStatusString() string {
	switch v.status {
	case sStopped:
		return "stopped"
	case sStopping:
		return "stopping"
	case sInstalling:
		return "installing"
	case sRunning:
		return "running"
	}
	return ""
}

// GetState returns game state
func (v *Valheim) GetState() State {
	return State{Status: v.GetStatusString(), Options: v.options}
}
