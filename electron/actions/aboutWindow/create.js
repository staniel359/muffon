import {
  BaseWindow,
  WebContentsView
} from 'electron'
import {
  windowIcon
} from '#/helpers/icons'
import {
  baseUrl
} from '#/helpers/urls'
import setAboutViewBounds from '#/actions/aboutView/setBounds'

function handleClose (
  event
) {
  event.preventDefault()

  aboutWindow.hide()
}

export default function () {
  const aboutWindowWidth = 500
  const aboutWindowHeight = 275

  const aboutWindowOptions = {
    width: aboutWindowWidth,
    height: aboutWindowHeight,
    minWidth: aboutWindowWidth,
    minHeight: aboutWindowHeight,
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
    new BaseWindow(
      aboutWindowOptions
    )

  aboutWindow.removeMenu()

  const aboutViewOptions = {
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  }

  aboutView =
    new WebContentsView(
      aboutViewOptions
    )

  setAboutViewBounds()

  aboutWindow
    .contentView
    .addChildView(
      aboutView
    )

  aboutView
    .webContents
    .loadURL(
      `${baseUrl}#/about`
    )

  aboutWindow.on(
    'close',
    handleClose
  )
}
