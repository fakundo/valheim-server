package valheim

import (
	"path/filepath"
	"strings"
	"valheim-server/util"
)

// StartOptions contains information about server start options
type StartOptions struct {
	Name     string
	World    string
	Password string
	Public   bool
}

// ValidateServerName validates server name
func ValidateServerName(serverName string) error {
	if strings.TrimSpace(serverName) == "" {
		return util.InvalidServerNameError
	}
	return nil
}

// ValidateServerPassword validates server password
func ValidateServerPassword(serverName string, public bool) error {
	if public && len(serverName) < 5 {
		return util.InvalidServerPasswordError
	}
	return nil
}

// ValidateWorldName validates world name
func ValidateWorldName(worldName string) error {
	if worldName != filepath.Base(worldName) {
		return util.InvalidWorldNameError
	}
	return nil
}

// Validate server start options
func (o *StartOptions) Validate() (err error) {
	err = ValidateServerName(o.Name)
	if err == nil {
		err = ValidateServerPassword(o.Password, o.Public)
	}
	if err == nil {
		err = ValidateWorldName(o.World)
	}
	return
}
