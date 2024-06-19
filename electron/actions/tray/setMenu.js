import {
  app,
  Menu
} from 'electron'
import showMainWindow from '../mainWindow/show.js'
import hideMainWindow from '../mainWindow/hide.js'
import showAboutWindow from '../aboutWindow/show.js'
import callExit from '../app/callExit.js'
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

  function handleExitActionClick () {
    callExit()
  }

  const toggleText =
    i18n.__(
      toggleKey
    )

  const aboutText =
    i18n.__(
      'about'
    )

  const exitText =
    i18n.__(
      'exit'
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
      label: exitText,
      click: handleExitActionClick
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
