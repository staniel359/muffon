const {
  Tray
} = require(
  'electron'
)
const {
  trayIcon
} = require(
  '../../icons'
)
const setMenu = require(
  './setMenu'
)
const setTooltip = require(
  './setTooltip'
)

function handleClick () {
  mainWindow.show()
}

function create () {
  tray = new Tray(
    trayIcon
  )

  setMenu()

  setTooltip()

  tray.on(
    'click',
    handleClick
  )
}

module.exports = create
