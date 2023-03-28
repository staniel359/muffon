import createMainWindow from '../mainWindow/create.js'
import createAboutWindow from '../aboutWindow/create.js'
import createTray from '../tray/create.js'
import createSessionHeadersHandler from '../session/createHeadersHandler.js'

export default function setup () {
  createMainWindow()

  createAboutWindow()

  createTray()

  createSessionHeadersHandler()
}
