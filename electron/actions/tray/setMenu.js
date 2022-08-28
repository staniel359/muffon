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
  'i18n'
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

  const menuItems = [
    {
      type: 'normal',
      label: i18n.__(
        toggleKey
      ),
      click: handleToggleActionClick
    },
    {
      type: 'normal',
      label: i18n.__(
        'about'
      ),
      click: handleAboutActionClick
    },
    {
      type: 'normal',
      label: i18n.__(
        'exit'
      ),
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
