import {
  BaseWindow,
  WebContentsView
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
import setAboutViewBounds from '../aboutView/setBounds.js'

function handleClose (
  event
) {
  event.preventDefault()

  aboutWindow.hide()
}

function handleDomReady () {
  setViewScale(
    aboutView
  )
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

  setViewScale(
    aboutView
  )

  changeViewBackgroundColor(
    aboutView
  )

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

  aboutView
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
