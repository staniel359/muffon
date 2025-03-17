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
import {
  isDevelopment,
  windowsDefaultSizes
} from '../../helpers/utils.js'
import {
  preloadScriptFilePath
} from '../../helpers/paths.js'
import setAboutWindowScale from './setScale.js'

function handleResize () {
  setAboutViewBounds()
}

function handleClose (
  event
) {
  event.preventDefault()

  aboutWindow.hide()
}

function handleFirstShow () {
  setAboutViewBounds()

  setAboutWindowScale()

  setViewScale(
    aboutView
  )
}

export default function () {
  const aboutWindowWidth =
    windowsDefaultSizes
      .about
      .width

  const aboutWindowHeight =
    windowsDefaultSizes
      .about
      .height

  const aboutWindowOptions = {
    width: aboutWindowWidth,
    height: aboutWindowHeight,
    minWidth: aboutWindowWidth,
    minHeight: aboutWindowHeight,
    icon: windowIcon,
    show: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false
  }

  aboutWindow =
    new BaseWindow(
      aboutWindowOptions
    )

  aboutWindow.removeMenu()

  const aboutViewOptions = {
    webPreferences: {
      devTools: isDevelopment,
      preload: preloadScriptFilePath,
      nodeIntegration: true
    }
  }

  aboutView =
    new WebContentsView(
      aboutViewOptions
    )

  changeViewBackgroundColor(
    aboutView
  )

  aboutWindow
    .contentView
    .addChildView(
      aboutView
    )

  const url = `${baseUrl}#/about`

  aboutView
    .webContents
    .loadURL(
      url
    )

  aboutWindow.once(
    'show',
    handleFirstShow
  )

  aboutWindow.on(
    'resize',
    handleResize
  )

  aboutWindow.on(
    'close',
    handleClose
  )
}
