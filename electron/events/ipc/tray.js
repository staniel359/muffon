import {
  ipcMain
} from 'electron'
import {
  handleSetTrayTooltip
} from '../../handlers/ipc/tray.js'

export default function () {
  ipcMain.on(
    'set-tray-tooltip',
    handleSetTrayTooltip
  )
}
