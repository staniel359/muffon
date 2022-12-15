const {
  app,
  Menu
} = require(
  'electron'
)
const showMainWindow = require(
  '../mainWindow/show'
)
const hideMainWindow = require(
  '../mainWindow/hide'
)
const showAboutWindow = require(
  '../aboutWindow/show'
)
const callExit = require(
  '../app/callExit'
)
const i18n = require(
  '../../../shared/plugins/i18n'
)
const {
  isMac
} = require(
  '../../utils'
)

function setMenu () {
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

module.exports = setMenu
