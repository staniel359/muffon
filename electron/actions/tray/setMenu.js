import {
  app,
  Menu
} from 'electron'
import showMainWindow from '../mainWindow/show.js'
import hideMainWindow from '../mainWindow/hide.js'
import showAboutWindow from '../aboutWindow/show.js'
import callQuit from '../app/callQuit.js'
import i18n from 'i18n'
import {
  isMacos
} from '../../helpers/utils.js'

export default function () {
  if (!tray) { return }

  const isVisible =
    mainWindow.isVisible()

  const toggleKey = (
    isVisible ? 'hide' : 'show'
  )

  function handleToggleActionClick () {
    if (isVisible) {
      hideMainWindow()
    } else {
      showMainWindow()
    }
  }

  function handleAboutActionClick () {
    showAboutWindow()
  }

  function handleQuitActionClick () {
    callQuit()
  }

  const toggleText =
    i18n.__(
      toggleKey
    )

  const aboutText =
    i18n.__(
      'about'
    )

  const quitText =
    i18n.__(
      'quit'
    )

  const menuItems = [
    {
      type: 'normal',
      label: toggleText,
      click: handleToggleActionClick
    },
    {
      type: 'normal',
      label: aboutText,
      click: handleAboutActionClick
    },
    {
      type: 'normal',
      label: quitText,
      click: handleQuitActionClick
    }
  ]

  const menu =
    Menu.buildFromTemplate(
      menuItems
    )

  tray.setContextMenu(
    menu
  )

  if (isMacos) {
    app.dock.setMenu(
      menu
    )
  }
}
