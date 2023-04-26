import {
  BrowserWindow
} from 'electron'
import {
  windowIcon
} from '#/helpers/icons'
import {
  baseUrl
} from '#/helpers/urls'

function handleClose (
  event
) {
  event.preventDefault()

  aboutWindow.hide()
}

export default function () {
  const aboutWindowWidth = 450
  const aboutWindowHeight = 230

  const options = {
    width: aboutWindowWidth,
    height: aboutWindowHeight,
    icon: windowIcon,
    show: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  }

  aboutWindow =
    new BrowserWindow(
      options
    )

  aboutWindow.setMinimumSize(
    aboutWindowWidth,
    aboutWindowHeight
  )

  aboutWindow.setMenu(
    null
  )

  aboutWindow.loadURL(
    `${baseUrl}#/about`
  )

  aboutWindow.on(
    'close',
    handleClose
  )
}
