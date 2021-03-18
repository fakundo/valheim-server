package env

import "os"

// Environment variables
var (
	DashboardPassword = os.Getenv("DASHBOARD_PASSWORD")
	ValheimPath       = os.Getenv("VALHEIM_PATH")
	ValheimSavePath   = os.Getenv("VALHEIM_SAVE_PATH")
	SteamCmdPath      = os.Getenv("STEAMCMD_PATH")
)
