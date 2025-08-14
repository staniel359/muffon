import {
  app
} from 'electron'
import createMainWindow
  from '../../actions/mainWindow/create.js'
import createAboutWindow
  from '../../actions/aboutWindow/create.js'
import createTray from '../../actions/tray/create.js'
import addSessionHeadersHandlers
  from '../../actions/session/headers/addHandlers.js'
import getElectronStoreKey from '../electronStore/getKey.js'

export default function () {
  createMainWindow()

  createAboutWindow()

  const isOpenAboutWindow =
    app
      .commandLine
      .hasSwitch(
        'open-about-window'
      )

  if (isOpenAboutWindow) {
    aboutWindow.show()
  }

  const isWithTrayIcon =
    getElectronStoreKey(
      'window.isWithTrayIcon'
    )

  if (isWithTrayIcon) {
    createTray()
  }

  addSessionHeadersHandlers()
}
