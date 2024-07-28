import {
  BrowserWindow
} from 'electron'
import {
  windowIcon
} from '../../helpers/icons.js'
import {
  baseUrl
} from '../../helpers/urls.js'
import changeViewBackgroundColor
  from '../view/changeBackgroundColor.js'
import setViewScale from '../view/setScale.js'

function handleClose (
  event
) {
  event.preventDefault()

  aboutWindow.hide()
}

function handleDomReady () {
  setViewScale(
    aboutWindow
  )
}

export default function () {
  const aboutWindowWidth = 500
  const aboutWindowHeight = 275

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

  changeViewBackgroundColor(
    aboutWindow
  )

  aboutWindow.setMinimumSize(
    aboutWindowWidth,
    aboutWindowHeight
  )

  aboutWindow.removeMenu()

  aboutWindow.loadURL(
    `${baseUrl}#/about`
  )

  aboutWindow
    .webContents
    .on(
      'dom-ready',
      handleDomReady
    )

  aboutWindow.on(
    'close',
    handleClose
  )
}
