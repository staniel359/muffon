import {
  BaseWindow,
  WebContentsView
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
import setMainViewBounds from '#/actions/mainView/setBounds'
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

  checkForUpdates()

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

function handleResize () {
  setMainViewBounds()

  setTabsBounds()
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

  changeViewBackgroundColor(
    mainWindow
  )

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

  changeViewBackgroundColor(
    mainWindow
  )

  setMainViewBounds()

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

  handleReadyToShow()

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

  // mainWindow.once(
  //   'ready-to-show',
  //   handleReadyToShow
  // )

  mainWindow.on(
    'show',
    handleShow
  )

  mainWindow.on(
    'resize',
    handleResize
  )

  mainWindow.on(
    'hide',
    handleHide
  )

  mainWindow.on(
    'close',
    handleClose
  )

  mainView
    .webContents
    .setWindowOpenHandler(
      handleNewWindow
    )
}
