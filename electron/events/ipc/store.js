const {
  ipcMain
} = require(
  'electron'
)
const {
  handleUpdateStore
} = require(
  '../../handlers/ipc/store'
)

ipcMain.handle(
  'update-store',
  handleUpdateStore
)
