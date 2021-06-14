const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  session
} = require('electron')
const path = require('path')
const ElectronStore = require('electron-store')

const appName = 'muffon'

const width = 800
const height = 600

const isDevelopment =
  process.env.NODE_ENV === 'development'
const isOSX = process.platform === 'darwin'

const iconPath = path.join(
  __dirname,
  (isDevelopment ? 'public' : ''),
  'icon.ico'
)
const developmentUrl = 'http://localhost:3000'
const productionPath = path.join(
  __dirname,
  'index.html'
)
const productionUrl = `file://${productionPath}`

const browserWindowOptions = {
  width,
  height,
  icon: iconPath,
  autoHideMenuBar: true,
  show: false,
  webPreferences: {
    contextIsolation: false,
    devTools: isDevelopment,
    nodeIntegration: true,
    webSecurity: false
  }
}

let mainWindow = null
let tray = null

if (isDevelopment) {
  const userDataPath = path.join(
    __dirname,
    'electron-data'
  )

  app.setPath('userData', userDataPath)
}

function createWindow () {
  mainWindow = new BrowserWindow(
    browserWindowOptions
  )

  const setupDevelopment = () => {
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require('electron-devtools-installer')

    installExtension(VUEJS_DEVTOOLS).then(() => {
      mainWindow.loadURL(developmentUrl)
    })

    mainWindow.webContents.openDevTools()
  }

  const setupProduction = () => {
    mainWindow.loadURL(productionUrl)
    mainWindow.setMenu(null)
  }

  if (isDevelopment) {
    setupDevelopment()
  } else {
    setupProduction()
  }

  const handleReadyToShow = () => {
    mainWindow.setMinimumSize(width, height)
    mainWindow.show()
  }

  const handleClose = event => {
    event.preventDefault()

    mainWindow.hide()
  }

  mainWindow.on('ready-to-show', handleReadyToShow)
  mainWindow.on('close', handleClose)

  const handleNewWindow = event => {
    event.preventDefault()
  }

  mainWindow.webContents.on(
    'new-window',
    handleNewWindow
  )
}

function createTrayOrDock () {
  const handleQuitClick = () => {
    app.exit()
  }

  const menu = Menu.buildFromTemplate([
    {
      type: 'normal',
      label: 'Quit',
      click: handleQuitClick
    }
  ])

  if (isOSX) {
    app.dock.setMenu(menu)
  } else {
    tray = new Tray(iconPath)

    tray.setContextMenu(menu)
    tray.setToolTip(appName)

    const handleTrayIconClick = () => {
      mainWindow.show()
    }

    tray.on('click', handleTrayIconClick)
  }
}

function createHeadersHandler () {
  const filter = {
    urls: ['https://*.youtube.com/*']
  }

  session
    .defaultSession
    .webRequest
    .onBeforeSendHeaders(filter, (details, request) => {
      details.requestHeaders.Referer = 'https://www.youtube.com'

      request({
        cancel: false,
        requestHeaders: details.requestHeaders
      })
    })
}

function setup () {
  ElectronStore.initRenderer()

  createWindow()
  createTrayOrDock()
  createHeadersHandler()
}

app.whenReady().then(setup)

app.setAppUserModelId(appName)

function handleAllWindowsClose (event) {
  event.preventDefault()
}

function handleActivate () {
  const isAnyWindowsOpen =
    !!BrowserWindow.getAllWindows().length

  if (!isAnyWindowsOpen) {
    createWindow()
  }
}

app.on(
  'window-all-closed',
  handleAllWindowsClose
)

app.on('activate', handleActivate)

function handleSetTrayTooltip (event, value) {
  tray.setToolTip(value)
}

ipcMain.handle(
  'set-tray-tooltip',
  handleSetTrayTooltip
)
