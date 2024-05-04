import {
  BrowserWindow
} from 'electron'
import {
  windowIcon
} from '#/helpers/icons'
import {
  isDevelopment,
  isShowDevTools
} from '#/helpers/utils'
import {
  baseUrl
} from '#/helpers/urls'
import getElectronStoreKey from '#/actions/electronStore/getKey'
import showMainWindow from './show'
import hideMainWindow from './hide'
import checkForUpdates from '#/actions/app/checkForUpdates'
import setMainWindowScale from './setScale'
import callExit from '#/actions/app/callExit'
import {
  handleNewWindow
} from '#/handlers/app'
import setTrayMenu from '#/actions/tray/setMenu'
import setTabsBounds from '#/actions/tabs/setBounds'
import changeViewBackgroundColor
  from '#/actions/view/changeBackgroundColor'

function handleReadyToShow () {
  const isMaximizeOnStart =
    getElectronStoreKey(
      'layout.isMaximizeOnStart'
    )

  if (isMaximizeOnStart) {
    mainWindow.maximize()
  }

  showMainWindow()

  if (!isDevelopment) {
    checkForUpdates()
  }

  const scale =
    getElectronStoreKey(
      'layout.scale'
    )

  setMainWindowScale(
    scale
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

  const isExitOnClose =
    getElectronStoreKey(
      'layout.isExitOnClose'
    )

  if (isExitOnClose) {
    callExit()
  } else {
    hideMainWindow()
  }
}

function handleEnterFullScreen () {
  setTabsBounds()
}

function handleLeaveFullScreen () {
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

  mainWindow.loadURL(
    baseUrl
  )

  mainWindow.setMinimumSize(
    mainWindowWidth,
    mainWindowHeight
  )

  mainWindow.removeMenu()

  changeViewBackgroundColor(
    mainWindow
  )

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

  mainWindow
    .webContents
    .setWindowOpenHandler(
      handleNewWindow
    )

  mainWindow.on(
    'enter-full-screen',
    handleEnterFullScreen
  )

  mainWindow.on(
    'leave-full-screen',
    handleLeaveFullScreen
  )
}
