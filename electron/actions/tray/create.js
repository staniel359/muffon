import {
  Tray
} from 'electron'
import {
  trayIcon
} from '#/helpers/icons'
import setMenu from './setMenu'
import setTooltip from './setTooltip'

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
