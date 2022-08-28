const {
  ipcMain
} = require(
  'electron'
)
const {
  handleChangeBackgroundImage,
  handleResetBackgroundImage,
  handleDeleteBackgroundImage
} = require(
  '../../handlers/ipc/backgroundImage'
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
