const {
  BrowserWindow
} = require(
  'electron'
)
const {
  windowIcon
} = require(
  '../../icons'
)
const {
  baseUrl
} = require(
  '../../urls'
)

function handleClose (
  event
) {
  event.preventDefault()

  aboutWindow.hide()
}

function create () {
  const aboutWindowWidth = 450
  const aboutWindowHeight = 230

  const options = {
    width: aboutWindowWidth,
    height: aboutWindowHeight,
    icon: windowIcon,
    show: false,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  }

  aboutWindow =
    new BrowserWindow(
      options
    )

  aboutWindow.setMinimumSize(
    aboutWindowWidth,
    aboutWindowHeight
  )

  aboutWindow.setMenu(
    null
  )

  aboutWindow.loadURL(
    `${baseUrl}#/about`
  )

  aboutWindow.on(
    'close',
    handleClose
  )
}

module.exports = create
