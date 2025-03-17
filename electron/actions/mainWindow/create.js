import {
  BaseWindow,
  WebContentsView
} from 'electron'
import {
  windowIcon
} from '../../helpers/icons.js'
import {
  isDevelopment,
  isLinux,
  wait,
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
import showViewDevTools from '../view/showDevTools.js'
import {
  handleNewWindow
} from '../../handlers/app.js'
import {
  preloadScriptFilePath
} from '../../helpers/paths.js'

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

function resizeViews () {
  setMainViewBounds()

  setTabsBounds()
}

function handleResize () {
  resizeViews()
}

function handleFocus () {
  const topTab = getTopTab()

  if (topTab) {
    topTab
      .webContents
      .focus()
  }
}

async function handleDidFinishLoad () {
  const isMaximizeOnStart =
    getElectronStoreKey(
      'window.isMaximizeOnStart'
    )

  if (isMaximizeOnStart) {
    if (isLinux) {
      showMainWindow()

      await wait(
        100
      )
    }

    mainWindow.maximize()
  } else {
    showMainWindow()
  }

  resizeViews()

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
    show: false
  }

  mainWindow =
    new BaseWindow(
      mainWindowOptions
    )

  mainWindow.removeMenu()

  const mainViewOptions = {
    webPreferences: {
      devTools: isDevelopment,
      preload: preloadScriptFilePath,
      nodeIntegration: true
    }
  }

  mainView =
    new WebContentsView(
      mainViewOptions
    )

  if (isDevelopment && isShowDevTools) {
    showViewDevTools(
      mainView
    )
  }

  changeViewBackgroundColor(
    mainView
  )

  setViewScale(
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

  mainView
    .webContents
    .once(
      'did-finish-load',
      handleDidFinishLoad
    )
}
