const {
  BrowserView
} = require(
  'electron'
)
const electronStore = require(
  '../../../shared/plugins/electronStore'
)
const getActiveId = require(
  './getActiveId'
)
const setActive = require(
  './setActive'
)
const setBounds = require(
  './setBounds'
)
const {
  baseUrl
} = require(
  '../../urls'
)
const {
  isDevelopment
} = require(
  '../../utils'
)
const {
  handleNewWindow
} = require(
  '../../handlers/app'
)

function create (
  data
) {
  const {
    uuid,
    path
  } = data

  const options = {
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  }

  const tab =
    new BrowserView(
      options
    )

  tab.uuid = uuid

  mainWindow.addBrowserView(
    tab
  )

  const isSwitchToNewTab =
    electronStore.get(
      'layout.isSwitchToNewTab'
    )

  if (!isSwitchToNewTab) {
    setActive(
      getActiveId()
    )
  }

  setBounds(
    tab
  )

  const autoResizeOptions = {
    width: true,
    height: true
  }

  tab.setAutoResize(
    autoResizeOptions
  )

  tab
    .webContents
    .loadURL(
      `${baseUrl}#/${path}`
    )

  if (isDevelopment) {
    const devToolsData = {
      mode: 'right'
    }

    tab
      .webContents
      .openDevTools(
        devToolsData
      )
  }

  mainWindow
    .webContents
    .send(
      'add-tab',
      data
    )

  function handleDidStartNavigation () {
    tab
      .webContents
      .send(
        'set-tab-id',
        uuid
      )
  }

  tab
    .webContents
    .setWindowOpenHandler(
      handleNewWindow
    )

  tab
    .webContents
    .on(
      'did-start-navigation',
      handleDidStartNavigation
    )
}

module.exports = create
