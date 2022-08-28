const setupI18n = require(
  '../i18n/setup'
)
const ElectronStore = require(
  'electron-store'
)
const createMainWindow = require(
  '../mainWindow/create'
)
const createAboutWindow = require(
  '../aboutWindow/create'
)
const createTray = require(
  '../tray/create'
)
const createSessionHeadersHandler = require(
  '../session/createHeadersHandler'
)

function setup () {
  setupI18n()

  ElectronStore.initRenderer()

  createMainWindow()

  createAboutWindow()

  createTray()

  createSessionHeadersHandler()
}

module.exports = setup
