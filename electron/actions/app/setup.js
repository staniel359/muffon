import createMainWindow from '#/actions/mainWindow/create'
import createAboutWindow from '#/actions/aboutWindow/create'
import createTray from '#/actions/tray/create'
import createSessionHeadersHandler
  from '#/actions/session/createHeadersHandler'

export default function () {
  createMainWindow()

  createAboutWindow()

  createTray()

  createSessionHeadersHandler()
}
