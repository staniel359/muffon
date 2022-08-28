const {
  ipcMain
} = require(
  'electron'
)
const {
  handleClearTabs
} = require(
  '../../handlers/ipc/tabs'
)

ipcMain.on(
  'clear-tabs',
  handleClearTabs
)
