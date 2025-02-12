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
  isDevelopment
} from '../../helpers/utils.js'
import {
  preloadScriptFilePath
} from '../../helpers/paths.js'

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
      preload: preloadScriptFilePath
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

  // if (isDevelopment) {
  //   const devToolsData = {
  //     mode: 'detach'
  //   }

  //   aboutView
  //     .webContents
  //     .openDevTools(
  //       devToolsData
  //     )
  // }

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
