import createMainWindow
  from '../../actions/mainWindow/create.js'
import createAboutWindow
  from '../../actions/aboutWindow/create.js'
import createTray from '../../actions/tray/create.js'
import addSessionHeadersHandlers
  from '../../actions/session/headers/addHandlers.js'
import setupGlobalShortcuts
  from '../../actions/app/setupGlobalShortcuts.js'
import getElectronStoreKey from '../electronStore/getKey.js'

export default function () {
  createMainWindow()

  createAboutWindow()

  const isWithTrayIcon =
    getElectronStoreKey(
      'window.isWithTrayIcon'
    )

  if (isWithTrayIcon) {
    createTray()
  }

  addSessionHeadersHandlers()

  setupGlobalShortcuts()
}
