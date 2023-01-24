const {
  BrowserWindow,
  Menu,
  screen
} = require(
  'electron'
)
const {
  windowIcon
} = require(
  '../../icons'
)
const {
  isDevelopment,
  isLinux
} = require(
  '../../utils'
)
const {
  baseUrl
} = require(
  '../../urls'
)
const electronStore = require(
  '../../../shared/plugins/electronStore'
)
const show = require(
  './show'
)
const hide = require(
  './hide'
)
const checkForUpdates = require(
  '../app/checkForUpdates'
)
const setTopOffset = require(
  '../app/setTopOffset'
)
const setScale = require(
  '../app/setScale'
)
const callExit = require(
  '../app/callExit'
)
const {
  handleNewWindow
} = require(
  '../../handlers/app'
)
const setTrayMenu = require(
  '../tray/setMenu'
)

function handleReadyToShow () {
  const isMaximizeOnStart =
    electronStore.get(
      'layout.isMaximizeOnStart'
    )

  if (isMaximizeOnStart) {
    mainWindow.maximize()
  }

  show()

  checkForUpdates()

  setTopOffset()

  const scale =
    electronStore.get(
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
    electronStore.get(
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

function create () {
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

  // const devToolsData = {
  //   mode: 'detach'
  // }

  // mainWindow
  //   .webContents
  //   .openDevTools(
  //     devToolsData
  //   )

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
}

module.exports = create
