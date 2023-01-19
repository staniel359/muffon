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
const {
  baseUrl
} = require(
  '../../urls'
)
const {
  isDevelopment,
  isMac
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

  const [
    width,
    height
  ] = mainWindow.getContentSize()

  const isFullScreen =
    mainWindow.isFullScreen()

  const titleBarHeight =
    (isMac && !isFullScreen) ? 28 : 0

  const tabsPanelHeight = 45

  const topOffset = (
    titleBarHeight + tabsPanelHeight
  )

  const boundsOptions = {
    x: 0,
    y: topOffset,
    width,
    height: (
      height - tabsPanelHeight
    )
  }

  tab.setBounds(
    boundsOptions
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
