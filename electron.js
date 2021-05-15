const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  globalShortcut
} = require('electron')
const path = require('path')
const ElectronStore = require('electron-store')

const appName = 'muffon'

const width = 800
const height = 600

const isDevelopment =
  process.env.NODE_ENV === 'development'

const iconPath = path.join(
  __dirname,
  (isDevelopment ? 'public' : ''),
  'icon.ico'
)
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

function createWindow () {
  win = new BrowserWindow(
    browserWindowOptions
  )

  const setupDevelopment = () => {
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require('electron-devtools-installer')

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
    win.setMinimumSize(width, height)
    win.show()
  }

  const handleClose = event =>  {
    event.preventDefault()

    win.hide()
  }

  win.on('ready-to-show', handleReadyToShow)
  win.on('close', handleClose)

  const handleNewWindow = event => {
    event.preventDefault()
  }

  win.webContents.on(
    'new-window',
    handleNewWindow
  )
}

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
    win.show()
  }

  tray.on('click', handleClick)
}

function setKeyBindings () {
  globalShortcut.register('Ctrl+F', () => {
    win.webContents.send('press-ctrl-f')
  })
}

function setup () {
  ElectronStore.initRenderer()

  createWindow()
  createTray()

  setKeyBindings()
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
