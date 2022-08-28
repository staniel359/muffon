const {
  ipcMain
} = require(
  'electron'
)
const {
  handleSetTrayTooltip
} = require(
  '../../handlers/ipc/tray'
)

ipcMain.on(
  'set-tray-tooltip',
  handleSetTrayTooltip
)
