import {
  Tray
} from 'electron'
import {
  trayIcon
} from '../../helpers/icons.js'
import setTrayMenu from './setMenu.js'
import setTrayTooltip from './setTooltip.js'

function handleClick () {
  mainWindow.show()
}

export default function () {
  tray =
    new Tray(
      trayIcon
    )

  setTrayMenu()

  setTrayTooltip()

  tray.on(
    'click',
    handleClick
  )
}
