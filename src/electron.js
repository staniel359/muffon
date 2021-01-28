const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const Store = require('electron-store')

// Init new window

function createWindow () {
  const iconPath = path.join(__dirname, '../dist/icons/icon.ico')
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true },
    show: false,
    autoHideMenuBar: true,
    icon: iconPath
  })

  const localhost = 'http://localhost:3000'
  const indexFile = `file://${path.join(__dirname, '../dist/index.html')}`

  if (isDev) {
    win.loadURL(localhost)
    win.webContents.openDevTools()
  } else {
    win.loadURL(indexFile)
    win.setMenu(null)
  }

  win.on('ready-to-show', () => {
    win.show()
    win.setMinimumSize(800, 600)
    Store.initRenderer()
  })

  // Install React Dev Tools

  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require('electron-devtools-installer')

  installExtension(REACT_DEVELOPER_TOOLS)
}

// Create window when app loads

app.whenReady().then(createWindow)

// Handle app events

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
