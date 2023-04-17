import {
  ipcMain
} from 'electron'
import {
  handleClearTabs
} from '#/handlers/ipc/tabs'

export default function () {
  ipcMain.on(
    'clear-tabs',
    handleClearTabs
  )
}
