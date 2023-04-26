import {
  BrowserWindow,
  Menu,
  screen
} from 'electron'
import {
  windowIcon
} from '#/helpers/icons'
import {
  isDevelopment,
  isLinux,
  isShowDevTools
} from '#/helpers/utils'
import {
  baseUrl
} from '#/helpers/urls'
import getElectronStoreKey from '#/actions/electronStore/getKey'
import show from './show'
import hide from './hide'
import checkForUpdates from '#/actions/app/checkForUpdates'
import setTopOffset from '#/actions/app/setTopOffset'
import setScale from './setScale'
import callExit from '#/actions/app/callExit'
import {
  handleNewWindow
} from '#/handlers/app'
import setTrayMenu from '#/actions/tray/setMenu'
import resetTabsBounds from '#/actions/tabs/resetBounds'
import setTabsBounds from '#/actions/tabs/setBounds'

function handleReadyToShow () {
  const isMaximizeOnStart =
    getElectronStoreKey(
      'layout.isMaximizeOnStart'
    )

  if (isMaximizeOnStart) {
    mainWindow.maximize()
  }

  show()

  checkForUpdates()

  setTopOffset()

  const scale =
    getElectronStoreKey(
      'layout.scale'
    )

  setScale(
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
    hide()
  }
}

function maximize () {
  const {
    width,
    height
  } = screen.getPrimaryDisplay().size

  mainWindow.setSize(
    width,
    height
  )
}

function handleMaximizeChange () {
  if (!isMaximized) {
    isMaximized = true

    maximize()
  }
}

function handleUnmaximizeChange () {
  isMaximized = false
}

function handleEnterFullScreen () {
  resetTabsBounds()
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

  Menu.setApplicationMenu(
    null
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

  if (isLinux) {
    mainWindow.on(
      'maximize',
      handleMaximizeChange
    )

    mainWindow.on(
      'unmaximize',
      handleUnmaximizeChange
    )
  }

  mainWindow.on(
    'enter-full-screen',
    handleEnterFullScreen
  )

  mainWindow.on(
    'leave-full-screen',
    handleLeaveFullScreen
  )
}
