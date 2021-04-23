const { app, ipcMain, BrowserWindow, Tray, Menu } = require('electron')
const ElectronStore = require('electron-store')
const {
  default: installExtension,
  VUEJS_DEVTOOLS
} = require('electron-devtools-installer')

const appName = 'muffon'

const width = 800
const height = 600

const isDevelopment =
  process.env.NODE_ENV === 'development'

const iconPath = `${__dirname}/public/icon.ico`
const developmentUrl = 'http://localhost:3000'
const productionPath = `file://${__dirname}/index.html`

const browserWindowOptions = {
  width,
  height,
  icon: iconPath,
  autoHideMenuBar: true,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    webSecurity: false
  }
}

let win = null
let tray = null
let isVisible = null

function createTray () {
  tray = new Tray(iconPath)

  const handleCloseClick = () => {
    app.exit()
  }

  const menuItems = [
    {
      type: 'normal',
      label: 'Close',
      click: handleCloseClick
    }
  ]
  const menu = Menu.buildFromTemplate(menuItems)

  tray.setContextMenu(menu)
  tray.setToolTip(appName)

  const handleClick = () => {
    isVisible ? win.hide() : win.show()
  }

  tray.on('click', handleClick)
}

function createWindow () {
  win = new BrowserWindow(
    browserWindowOptions
  )

  const setupDevelopment = () => {
    installExtension(VUEJS_DEVTOOLS).then(() => {
      win.loadURL(developmentUrl)
    })

    win.webContents.openDevTools()
  }

  const setupProduction = () => {
    win.loadURL(productionPath)
    win.setMenu(null)
  }

  if (isDevelopment) {
    setupDevelopment()
  } else {
    setupProduction()
  }

  const handleReadyToShow = () => {
    win.show()
    win.setMinimumSize(width, height)
  }

  const handleClose = event =>  {
    event.preventDefault()

    win.hide()
  }

  const handleShow = () => {
    isVisible = true
  }

  const handleHide = () => {
    isVisible = false
  }

  win.on('ready-to-show', handleReadyToShow)
  win.on('close', handleClose)
  win.on('show', handleShow)
  win.on('hide', handleHide)

  const handleNewWindow = event => {
    event.preventDefault()
  }

  win.webContents.on(
    'new-window',
    handleNewWindow
  )
}

function setup () {
  ElectronStore.initRenderer()

  createWindow()
  createTray()
}

app.whenReady().then(setup)

app.setAppUserModelId(appName)

function handleAllWindowsClose (event) {
  event.preventDefault()
}

app.on(
  'window-all-closed',
  handleAllWindowsClose
)

function handleSetTrayTooltip (event, value) {
  tray.setToolTip(value)
}

ipcMain.handle(
  'set-tray-tooltip',
  handleSetTrayTooltip
)
