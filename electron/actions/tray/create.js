import {
  Tray
} from 'electron'
import {
  trayIcon
} from '../../icons.js'
import setMenu from './setMenu.js'
import setTooltip from './setTooltip.js'

function handleClick () {
  mainWindow.show()
}

export default function () {
  tray = new Tray(
    trayIcon
  )

  setMenu()

  setTooltip()

  tray.on(
    'click',
    handleClick
  )
}
