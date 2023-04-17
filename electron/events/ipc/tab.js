import {
  ipcMain
} from 'electron'
import {
  handleAddTab,
  handleSetActiveTab,
  handleUpdateTab,
  handleDeleteTab
} from '#/handlers/ipc/tab'

export default function () {
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
    'delete-tab',
    handleDeleteTab
  )
}
