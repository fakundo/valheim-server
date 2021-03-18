package valheim

import (
	"path/filepath"
	"strings"
	"sync"
	"valheim-server/env"
	"valheim-server/util"
)

var (
	adminListPath     = filepath.Join(env.ValheimSavePath, "adminlist.txt")
	bannedListPath    = filepath.Join(env.ValheimSavePath, "bannedlist.txt")
	permittedListPath = filepath.Join(env.ValheimSavePath, "permittedlist.txt")
	adminListMtx      sync.Mutex
	bannedListMtx     sync.Mutex
	permittedListMtx  sync.Mutex
)

func omitComments(list []string) []string {
	res := make([]string, 0)
	for _, line := range list {
		if !strings.HasPrefix(line, "//") {
			res = append(res, line)
		}
	}
	return res
}

// GetAdminList returns list of admins
func (v *Valheim) GetAdminList() []string {
	list := util.ReadFileLines(adminListPath)
	return omitComments(list)
}

// AddAdmin adds player to admin list
func (v *Valheim) AddAdmin(item string) error {
	adminListMtx.Lock()
	defer adminListMtx.Unlock()
	return util.AddFileLine(adminListPath, item)
}

// DeleteAdmin removes player from admin list
func (v *Valheim) DeleteAdmins(items []string) error {
	adminListMtx.Lock()
	defer adminListMtx.Unlock()
	return util.RemoveFileLines(adminListPath, items)
}

// GetBannedList returns list of banned players
func (v *Valheim) GetBannedList() []string {
	list := util.ReadFileLines(bannedListPath)
	return omitComments(list)
}

// AddBanned adds player to banned list
func (v *Valheim) AddBanned(item string) error {
	bannedListMtx.Lock()
	defer bannedListMtx.Unlock()
	return util.AddFileLine(bannedListPath, item)
}

// DeleteBanned removes player from banned list
func (v *Valheim) DeleteBanned(items []string) error {
	bannedListMtx.Lock()
	defer bannedListMtx.Unlock()
	return util.RemoveFileLines(bannedListPath, items)
}

// GetPermittedList returns list of permitted players
func (v *Valheim) GetPermittedList() []string {
	list := util.ReadFileLines(permittedListPath)
	return omitComments(list)
}

// AddPermitted adds player to permitted list
func (v *Valheim) AddPermitted(item string) error {
	permittedListMtx.Lock()
	defer permittedListMtx.Unlock()
	return util.AddFileLine(permittedListPath, item)
}

// DeletePermitted removes player from permitted list
func (v *Valheim) DeletePermitted(items []string) error {
	permittedListMtx.Lock()
	defer permittedListMtx.Unlock()
	return util.RemoveFileLines(permittedListPath, items)
}
