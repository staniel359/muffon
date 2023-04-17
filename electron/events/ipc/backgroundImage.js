import {
  ipcMain
} from 'electron'
import {
  handleCreateBackgroundImage,
  handleChangeBackgroundImage,
  handleResetBackgroundImage,
  handleDeleteBackgroundImage
} from '#/handlers/ipc/backgroundImage'

export default function () {
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
}
