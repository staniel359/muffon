import {
  ipcMain
} from 'electron'
import {
  handleSetTrayTooltip,
  handleToggleTray,
} from '../../handlers/ipc/window.js'

export default function () {
  ipcMain.on(
    'set-tray-tooltip',
    handleSetTrayTooltip
  )

  ipcMain.on(
    'toggle-tray',
    handleToggleTray
  )
}
