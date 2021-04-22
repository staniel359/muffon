const { app, BrowserWindow } = require('electron')
const ElectronStore = require('electron-store')
// const {
//   default: installExtension,
//   VUEJS_DEVTOOLS
// } = require('electron-devtools-installer')

const width = 800
const height = 600
const icon = `${__dirname}/public/icon.ico`

const isDevelopment = process.env.NODE_ENV === 'development'
const isMac = process.platform === 'darwin'
const isNoBrowserWindows = !BrowserWindow.getAllWindows().length

const developmentUrl = 'http://localhost:3000'
const productionPath = `file://${__dirname}/index.html`

const browserWindowOptions = {
  width,
  height,
  icon,
  autoHideMenuBar: true,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    webSecurity: false
  }
}

function createWindow () {
  ElectronStore.initRenderer()

  const win = new BrowserWindow(
    browserWindowOptions
  )

  if (isDevelopment) {
    // installVueDevTools()

    win.loadURL(developmentUrl)

    win.webContents.openDevTools()
  } else {
    win.loadURL(productionPath)
    win.setMenu(null)
  }

  function handleReadyToShow () {
    win.show()
    win.setMinimumSize(width, height)
  }

  function handleNewWindow (event) {
    event.preventDefault()
  }

  win.on('ready-to-show', handleReadyToShow)
  win.webContents.on('new-window', handleNewWindow)
}

// async function installVueDevTools () {
//   try {
//     await installExtension(VUEJS_DEVTOOLS)
//   } catch (e) {
//     console.error(
//       'Vue Devtools failed to install:',
//       e.toString()
//     )
//   }
// }

function handleActivate () {
  isNoBrowserWindows && createWindow()
}

function handleAllWindowsClose () {
  !isMac && app.quit()
}

app.whenReady().then(createWindow)

app.on('activate', handleActivate)
app.on('window-all-closed', handleAllWindowsClose)
