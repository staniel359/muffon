import {
  BaseWindow,
  WebContentsView
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
import getTopTab from '../tab/getTop.js'
import setMainViewBounds from '../mainView/setBounds.js'
import changeViewBackgroundColor
  from '../view/changeBackgroundColor.js'
import {
  handleNewWindow
} from '../../handlers/app.js'

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
  setMainViewBounds()

  setTabsBounds()
}

function handleFocus () {
  const topTab = getTopTab()

  if (!topTab) { return }

  topTab.webContents.focus()
}

export default function () {
  const mainWindowWidth = 900
  const mainWindowHeight = 600

  const mainWindowOptions = {
    width: mainWindowWidth,
    height: mainWindowHeight,
    minWidth: mainWindowWidth,
    minHeight: mainWindowHeight,
    icon: windowIcon,
    show: false,
    webPreferences: {
      contextIsolation: false,
      devTools: isDevelopment,
      nodeIntegration: true
    }
  }

  mainWindow =
    new BaseWindow(
      mainWindowOptions
    )

  mainWindow.removeMenu()

  const mainViewOptions = {
    webPreferences: {
      contextIsolation: false,
      devTools: isDevelopment,
      nodeIntegration: true
    }
  }

  mainView =
    new WebContentsView(
      mainViewOptions
    )

  setMainViewBounds()

  setViewScale(
    mainView
  )

  changeViewBackgroundColor(
    mainView
  )

  mainWindow
    .contentView
    .addChildView(
      mainView
    )

  mainView
    .webContents
    .loadURL(
      baseUrl
    )

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

  if (isShowDevTools) {
    const devToolsData = {
      mode: 'detach'
    }

    mainView
      .webContents
      .openDevTools(
        devToolsData
      )
  }

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

  mainWindow.on(
    'focus',
    handleFocus
  )

  mainView
    .webContents
    .setWindowOpenHandler(
      handleNewWindow
    )
}
