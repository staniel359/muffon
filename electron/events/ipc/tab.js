const {
  ipcMain
} = require(
  'electron'
)
const {
  handleAddTab,
  handleSetActiveTab,
  handleUpdateTab,
  handleRemoveTab
} = require(
  '../../handlers/ipc/tab'
)

ipcMain.on(
  'add-tab',
  handleAddTab
)

ipcMain.on(
  'set-active-tab',
  handleSetActiveTab
)

ipcMain.on(
  'update-tab',
  handleUpdateTab
)

ipcMain.on(
  'remove-tab',
  handleRemoveTab
)
