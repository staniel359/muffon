const {
  ipcMain
} = require(
  'electron'
)
const {
  handleCreateBackgroundImage,
  handleChangeBackgroundImage,
  handleResetBackgroundImage,
  handleDeleteBackgroundImage
} = require(
  '../../handlers/ipc/backgroundImage'
)

ipcMain.on(
  'create-background-image',
  handleCreateBackgroundImage
)

ipcMain.on(
  'change-background-image',
  handleChangeBackgroundImage
)

ipcMain.on(
  'reset-background-image',
  handleResetBackgroundImage
)

ipcMain.on(
  'delete-background-image',
  handleDeleteBackgroundImage
)
