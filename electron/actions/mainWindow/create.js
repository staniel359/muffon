import {
  BrowserWindow
} from 'electron'
import {
  windowIcon
} from '../../helpers/icons.js'
import {
  isDevelopment,
  isShowDevTools
} from '../../helpers/utils.js'
import {
  baseUrl
} from '../../helpers/urls.js'
import getElectronStoreKey from '../electronStore/getKey.js'
import showMainWindow from './show.js'
import hideMainWindow from './hide.js'
import checkForUpdates from '../app/checkForUpdates.js'
import setViewScale from '../view/setScale.js'
import callQuit from '../app/callQuit.js'
import setTrayMenu from '../tray/setMenu.js'
import setTabsBounds from '../tabs/setBounds.js'
import changeViewBackgroundColor
  from '../view/changeBackgroundColor.js'

function handleReadyToShow () {
  const isMaximizeOnStart =
    getElectronStoreKey(
      'window.isMaximizeOnStart'
    )

  if (isMaximizeOnStart) {
    mainWindow.maximize()
  }

  showMainWindow()

  const isCheckForNewVersions =
    getElectronStoreKey(
      'updates.isCheckForNewVersions'
    )

  const isCheckForUpdates = (
    !isDevelopment &&
      isCheckForNewVersions
  )

  if (isCheckForUpdates) {
    checkForUpdates()
  }

  setViewScale(
    mainWindow
  )
}

function handleShow () {
  setTrayMenu()
}

function handleHide () {
  setTrayMenu()
}

function handleClose (
  event
) {
  event.preventDefault()

  const isQuitOnClose =
    getElectronStoreKey(
      'window.isQuitOnClose'
    )

  if (isQuitOnClose) {
    callQuit()
  } else {
    hideMainWindow()
  }
}

function handleResize () {
  setTabsBounds()
}

export default function () {
  const mainWindowWidth = 900
  const mainWindowHeight = 600

  const options = {
    width: mainWindowWidth,
    height: mainWindowHeight,
    icon: windowIcon,
    show: false,
    webPreferences: {
      contextIsolation: false,
      devTools: isDevelopment,
      nodeIntegration: true
    }
  }

  mainWindow =
    new BrowserWindow(
      options
    )

  changeViewBackgroundColor(
    mainWindow
  )

  mainWindow.loadURL(
    baseUrl
  )

  mainWindow.setMinimumSize(
    mainWindowWidth,
    mainWindowHeight
  )

  mainWindow.removeMenu()

  if (isShowDevTools) {
    const devToolsData = {
      mode: 'detach'
    }

    mainWindow
      .webContents
      .openDevTools(
        devToolsData
      )
  }

  mainWindow.once(
    'ready-to-show',
    handleReadyToShow
  )

  mainWindow.on(
    'show',
    handleShow
  )

  mainWindow.on(
    'hide',
    handleHide
  )

  mainWindow.on(
    'close',
    handleClose
  )

  mainWindow.on(
    'resize',
    handleResize
  )
}
