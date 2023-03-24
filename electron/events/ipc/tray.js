import {
  ipcMain
} from 'electron'
import {
  handleSetTrayTooltip
} from '../../handlers/ipc/tray.js'

export default function set () {
  ipcMain.on(
    'set-tray-tooltip',
    handleSetTrayTooltip
  )
}
