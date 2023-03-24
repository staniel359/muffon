import ElectronStore from 'electron-store'
import createMainWindow from '../mainWindow/create.js'
import createAboutWindow from '../aboutWindow/create.js'
import createTray from '../tray/create.js'
import createSessionHeadersHandler from '../session/createHeadersHandler.js'

export default function setup () {
  ElectronStore.initRenderer()

  createMainWindow()

  createAboutWindow()

  createTray()

  createSessionHeadersHandler()
}
