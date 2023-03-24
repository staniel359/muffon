import {
  ipcMain
} from 'electron'
import {
  handleClearTabs
} from '../../handlers/ipc/tabs.js'

export default function set () {
  ipcMain.on(
    'clear-tabs',
    handleClearTabs
  )
}
