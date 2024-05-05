import createMainWindow from '../../actions/mainWindow/create.js'
import createAboutWindow from '../../actions/aboutWindow/create.js'
import createTray from '../../actions/tray/create.js'
import createSessionHeadersHandler
  from '../../actions/session/createHeadersHandler.js'

export default function () {
  createMainWindow()

  createAboutWindow()

  createTray()

  createSessionHeadersHandler()
}
