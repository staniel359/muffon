import {
  ipcMain
} from 'electron'
import {
  handleAddTab,
  handleSetActiveTab,
  handleUpdateTab,
  handleRemoveTab
} from '../../handlers/ipc/tab.js'

export default function set () {
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
}
