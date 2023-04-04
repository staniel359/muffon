import {
  ipcMain
} from 'electron'
import {
  handleClearTabs
} from '../../handlers/ipc/tabs.js'

export default function () {
  ipcMain.on(
    'clear-tabs',
    handleClearTabs
  )
}
