package valheim

import (
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"syscall"
	"valheim-server/env"
	"valheim-server/util"
)

const (
	sStopped = iota
	sStopping
	sInstalling
	sRunning
)

var (
	serverMtx sync.Mutex
)

// Valheim contains information of game processes
type Valheim struct {
	status  int
	proc    *exec.Cmd
	out     io.ReadCloser
	options StartOptions
}

// Exec process and stores information in Valheim struct
func (v *Valheim) exec(name string, arg ...string) (err error) {
	v.proc = exec.Command(name, arg...)
	v.out, err = v.proc.StdoutPipe()
	if err != nil {
		return err
	}
	return v.proc.Start()
}

// Start game server
func (v *Valheim) Start(options StartOptions, callback func(error)) {
	serverMtx.Lock()
	defer serverMtx.Unlock()
	var err error
	defer func() {
		callback(err)
	}()
	// Check current status
	if v.status != sStopped {
		err = util.AlreadyStartedError
		return
	}
	// Validate options
	err = options.Validate()
	if err != nil {
		return
	}
	v.options = options
	// Start install/update
	err = v.exec(
		env.SteamCmdPath,
		"+login", "anonymous",
		"+force_install_dir", env.ValheimPath,
		"+app_update", "896660",
		"+quit")
	if err != nil {
		return
	}
	v.status = sInstalling
	callback(nil)
	// Wait install/update
	err = v.proc.Wait()
	if err != nil {
		v.status = sStopped
		return
	}
	// Install env vars
	err = os.Setenv("LD_LIBRARY_PATH", filepath.Join(env.ValheimPath, "linux64"))
	if err != nil {
		v.status = sStopped
		return
	}
	err = os.Setenv("SteamAppId", "892970")
	if err != nil {
		v.status = sStopped
		return
	}
	// Start game server
	publicStr := "0"
	if v.options.Public {
		publicStr = "1"
	}
	err = v.exec(
		filepath.Join(env.ValheimPath, "valheim_server.x86_64"),
		"-name", v.options.Name,
		"-world", v.options.World,
		"-password", v.options.Password,
		"-public", publicStr,
		"-port", "2456",
		"-savedir", env.ValheimSavePath)
	if err != nil {
		v.status = sStopped
		return
	}
	v.status = sRunning
}

// Stop game server
func (v *Valheim) Stop(callback func(error)) {
	serverMtx.Lock()
	defer serverMtx.Unlock()
	var err error
	defer func() {
		callback(err)
	}()
	if v.status != sRunning {
		err = util.AlreadyStoppedError
		return
	}
	v.status = sStopping
	callback(nil)
	_ = v.proc.Process.Signal(syscall.SIGINT)
	_ = v.proc.Wait()
	v.status = sStopped
	return
}

// GetOutput returns output reader
func (v *Valheim) GetOutput() *io.ReadCloser {
	return &v.out
}
