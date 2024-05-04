import {
  Tray
} from 'electron'
import {
  trayIcon
} from '#/helpers/icons'
import setTrayMenu from './setMenu'
import setTrayTooltip from './setTooltip'

function handleClick () {
  mainWindow.show()
}

export default function () {
  tray = new Tray(
    trayIcon
  )

  setTrayMenu()

  setTrayTooltip()

  tray.on(
    'click',
    handleClick
  )
}
