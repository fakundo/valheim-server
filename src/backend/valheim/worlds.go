package valheim

import (
	"path/filepath"
	"sync"
	"valheim-server/env"
	"valheim-server/util"

	"github.com/googollee/go-socket.io/parser"
)

var (
	worldsPath = filepath.Join(env.ValheimSavePath, "worlds")
	worldsMtx  sync.Mutex
)

// WorldListItem contains information about world name and size
type WorldListItem struct {
	Name string
	Size int
}

// World contains information about game world
type World struct {
	Name string
	DB   parser.Buffer
	FWL  parser.Buffer
}

func (v *Valheim) ensureWorldIsNotInUse(name string) error {
	if v.status == sRunning && v.options.Name == name {
		return util.WorldInUseError
	}
	return nil
}

// GetWorldList returns list of world names
func (v *Valheim) GetWorldList() []WorldListItem {
	names, sizes := util.ReadDirFiles(worldsPath, "db")
	worlds := make([]WorldListItem, 0)
	for i, name := range names {
		worlds = append(worlds, WorldListItem{name, sizes[i]})
	}
	return worlds
}

// GetWorld returns world
func (v *Valheim) GetWorld(name string) (w World, err error) {
	err = ValidateWorldName(name)
	if err != nil {
		return
	}
	w.DB.Data, err = util.ReadFile(filepath.Join(worldsPath, name+".db"))
	if err != nil {
		return
	}
	w.FWL.Data, err = util.ReadFile(filepath.Join(worldsPath, name+".fwl"))
	w.Name = name
	return
}

// AddWorld creates new world
func (v *Valheim) AddWorld(w *World) (err error) {
	worldsMtx.Lock()
	defer worldsMtx.Unlock()
	err = ValidateWorldName(w.Name)
	if err != nil {
		return
	}
	err = v.ensureWorldIsNotInUse(w.Name)
	if err != nil {
		return
	}
	err = util.WriteFile(filepath.Join(worldsPath, w.Name+".db"), w.DB.Data)
	if err != nil {
		return
	}
	err = util.WriteFile(filepath.Join(worldsPath, w.Name+".fwl"), w.FWL.Data)
	return
}

// DeleteWorld deletes world
func (v *Valheim) DeleteWorlds(names []string) (err error) {
	worldsMtx.Lock()
	defer worldsMtx.Unlock()
	for _, name := range names {
		err = ValidateWorldName(name)
		if err != nil {
			return
		}
		err = v.ensureWorldIsNotInUse(name)
		if err != nil {
			return
		}
		_ = util.RemoveFile(filepath.Join(worldsPath, name+".db"))
		_ = util.RemoveFile(filepath.Join(worldsPath, name+".fwl"))
	}
	return
}
