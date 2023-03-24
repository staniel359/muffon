import {
  app,
  Menu
} from 'electron'
import showMainWindow from '../mainWindow/show.js'
import hideMainWindow from '../mainWindow/hide.js'
import showAboutWindow from '../aboutWindow/show.js'
import callExit from '../app/callExit.js'
import i18n from '../../../shared/plugins/i18n.js'
import {
  isMac
} from '../../utils.js'

export default function setMenu () {
  const isVisible =
    mainWindow.isVisible()

  const toggleKey =
    isVisible ? 'hide' : 'show'

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
    i18n.global.t(
      `electron.${toggleKey}`
    )

  const aboutText =
    i18n.global.t(
      'electron.about'
    )

  const exitText =
    i18n.global.t(
      'electron.exit'
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
