import {
  app,
  Menu
} from 'electron'
import showMainWindow from '#/actions/mainWindow/show'
import hideMainWindow from '#/actions/mainWindow/hide'
import showAboutWindow from '#/actions/aboutWindow/show'
import callExit from '#/actions/app/callExit'
import i18n from 'i18n'
import {
  isMac
} from '#/helpers/utils'

export default function () {
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

  if (isMac) {
    app.dock.setMenu(
      menu
    )
  }
}
