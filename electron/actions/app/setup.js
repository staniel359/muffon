import createMainWindow
  from '../../actions/mainWindow/create.js'
import createAboutWindow
  from '../../actions/aboutWindow/create.js'
import createTray from '../../actions/tray/create.js'
import addSessionHeadersHandlers
  from '../../actions/session/headers/addHandlers.js'
import addGlobalShortcuts
  from '../../actions/app/addGlobalShortcuts.js'

export default function () {
  createMainWindow()

  createAboutWindow()

  createTray()

  addSessionHeadersHandlers()

  addGlobalShortcuts()
}
