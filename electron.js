const {
  app,
  BrowserView,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  session,
  Tray
} = require(
  'electron'
)
const path = require(
  'path'
)
const ElectronStore = require(
  'electron-store'
)

const appName = 'muffon'

const width = 800
const height = 600

const isDevelopment =
  process.env.NODE_ENV === 'development'

const isMac =
  process.platform === 'darwin'

const publicPath =
  isDevelopment ? 'public' : ''

const iconPath =
  path.join(
    __dirname,
    publicPath,
    'icon.png'
  )

const icon =
  nativeImage.createFromPath(
    iconPath
  )

const baseUrl = getBaseUrl()

function getBaseUrl () {
  if (isDevelopment) {
    return 'http://localhost:3000/'
  } else {
    const productionPath = path.join(
      __dirname,
      'index.html'
    )

    return `file://${productionPath}`
  }
}

const i18n = {
  en: {
    show: 'Show',
    hide: 'Hide',
    exit: 'Exit'
  },
  it: {
    show: 'Mostra',
    hide: 'Nascondi',
    exit: 'Esci'
  },
  ru: {
    show: 'Открыть',
    hide: 'Скрыть',
    exit: 'Выйти'
  }
}

if (isDevelopment) {
  const userDataPath =
    path.join(
      __dirname,
      'electron_data'
    )

  app.setPath(
    'userData',
    userDataPath
  )
}

const electronStore =
  new ElectronStore(
    {
      accessPropertiesByDotNotation: false
    }
  )

let language =
  electronStore.get(
    'profile.language',
    'en'
  )

let mainWindow
let tray

let tabs = []

//

app.whenReady().then(
  setup
)

app.setAppUserModelId(
  appName
)

//

app.on(
  'window-all-closed',
  handleAllWindowsClose
)

app.on(
  'activate',
  handleActivate
)

//

ipcMain.on(
  'set-title',
  handleSetTitle
)

ipcMain.on(
  'set-tray-tooltip',
  handleSetTrayTooltip
)

ipcMain.on(
  'add-tab',
  handleAddTab
)

ipcMain.on(
  'set-top-tab',
  handleSetTopTab
)

ipcMain.on(
  'remove-tab',
  handleRemoveTab
)

ipcMain.on(
  'clear-tabs',
  handleClearTabs
)

ipcMain.handle(
  'update-store',
  handleUpdateStore
)

ipcMain.on(
  'update-tab',
  handleUpdateTab
)

ipcMain.handle(
  'clear-cache',
  handleClearCache
)

ipcMain.on(
  'set-language',
  handleSetLanguage
)

ipcMain.on(
  'exit',
  handleExit
)

//

function handleAllWindowsClose (
  event
) {
  event.preventDefault()
}

function handleActivate () {
  const isAnyWindowsOpen =
    !!BrowserWindow
      .getAllWindows()
      .length

  if (!isAnyWindowsOpen) {
    createWindow()
  }
}

//

function handleSetTitle (
  _,
  value
) {
  mainWindow.setTitle(
    value || appName
  )
}

function handleSetTrayTooltip (
  _,
  value
) {
  tray.setToolTip(
    value || appName
  )
}

function handleAddTab (
  _,
  value
) {
  const {
    uuid,
    path
  } = value

  const tab =
    new BrowserView(
      {
        webPreferences: {
          contextIsolation: false,
          nodeIntegration: true
        }
      }
    )

  tab.uuid = uuid

  mainWindow.addBrowserView(
    tab
  )

  prependTabToTabs(
    tab
  )

  const [
    width,
    height
  ] = mainWindow.getContentSize()

  const tabsPanelHeight = 45

  tab.setBounds(
    {
      x: 0,
      y: tabsPanelHeight,
      width,
      height: (
        height - tabsPanelHeight
      )
    }
  )

  tab.setAutoResize(
    {
      width: true,
      height: true
    }
  )

  tab.webContents.loadURL(
    `${baseUrl}#/${path}`
  )

  if (isDevelopment) {
    tab.webContents.openDevTools(
      {
        mode: 'right'
      }
    )
  }

  mainWindow.webContents.send(
    'handle-add-tab',
    value
  )

  function handleNewWindow (
    event
  ) {
    event.preventDefault()
  }

  function handleDidStartNavigation () {
    tab.webContents.send(
      'set-tab-id',
      uuid
    )
  }

  tab.webContents.on(
    'new-window',
    handleNewWindow
  )

  tab.webContents.on(
    'did-start-navigation',
    handleDidStartNavigation
  )
}

function handleSetTopTab (
  _,
  tabId
) {
  const tab = findTab(
    tabId
  )

  mainWindow.setTopBrowserView(
    tab
  )

  removeTabFromTabs(
    tabId
  )

  prependTabToTabs(
    tab
  )

  mainWindow.webContents.send(
    'handle-set-top-tab',
    tabId
  )
}

function handleRemoveTab (
  _,
  tabId
) {
  const tab = findTab(
    tabId
  )

  removeTab(
    tab
  )

  removeTabFromTabs(
    tabId
  )

  mainWindow.webContents.send(
    'handle-remove-tab',
    tabId
  )

  if (tabs.length) {
    const {
      uuid
    } = tabs[0]

    mainWindow.webContents.send(
      'handle-set-top-tab',
      uuid
    )
  }
}

function handleClearTabs () {
  getTabs().forEach(
    removeTab
  )
}

function handleUpdateStore (
  _,
  data
) {
  function updateViewStore (
    view
  ) {
    view.webContents.send(
      'handle-update-store',
      data
    )
  }

  const views = [
    mainWindow,
    ...getTabs()
  ]

  views.forEach(
    updateViewStore
  )
}

function handleUpdateTab (
  _,
  {
    tabId,
    data
  }
) {
  mainWindow.webContents.send(
    'handle-update-tab',
    {
      tabId,
      data
    }
  )
}

function handleClearCache () {
  return mainWindow
    .webContents
    .session
    .clearCache()
}

function handleSetLanguage (
  _,
  value
) {
  language = value

  setTrayMenu()
}

function handleExit () {
  app.exit()
}

//

function setup () {
  ElectronStore.initRenderer()

  createWindow()

  createTray()

  createHeadersHandler()
}

function createWindow () {
  const mainWindowIcon =
    icon.resize(
      {
        width: 64,
        height: 64
      }
    )

  mainWindow =
    new BrowserWindow(
      {
        width,
        height,
        icon: mainWindowIcon,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
          contextIsolation: false,
          devTools: isDevelopment,
          nodeIntegration: true
        }
      }
    )

  mainWindow.loadURL(
    baseUrl
  )

  mainWindow.setMenu(
    null
  )

  function handleReadyToShow () {
    mainWindow.setMinimumSize(
      width,
      height
    )

    show()
  }

  mainWindow.on(
    'ready-to-show',
    handleReadyToShow
  )

  function handleClose (
    event
  ) {
    event.preventDefault()

    hide()
  }

  mainWindow.on(
    'close',
    handleClose
  )
}

function createTray () {
  const trayIcon =
    icon.resize(
      {
        width: 16,
        height: 16
      }
    )

  tray = new Tray(
    trayIcon
  )

  setTrayMenu()

  tray.setToolTip(
    appName
  )

  function handleClick () {
    mainWindow.show()
  }

  tray.on(
    'click',
    handleClick
  )
}

function createHeadersHandler () {
  const filter = {
    urls: [
      'https://*.youtube.com/*'
    ]
  }

  function handleBeforeSendHeaders (
    details,
    request
  ) {
    details
      .requestHeaders
      .Referer = 'https://www.youtube.com'

    const {
      requestHeaders
    } = details

    request(
      {
        cancel: false,
        requestHeaders
      }
    )
  }

  session
    .defaultSession
    .webRequest
    .onBeforeSendHeaders(
      filter,
      handleBeforeSendHeaders
    )
}

function setTrayMenu () {
  const showHideKey =
    mainWindow.isVisible() ? 'hide' : 'show'

  const showHideText =
    i18n[language][showHideKey]

  const showHideAction =
    mainWindow.isVisible() ? hide : show

  const exitText = i18n[language].exit

  const menuItems = [
    {
      type: 'normal',
      label: showHideText,
      click: showHideAction
    },
    {
      type: 'normal',
      label: exitText,
      click: exit
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

function show () {
  mainWindow.show()

  setTrayMenu()
}

function hide () {
  mainWindow.hide()

  setTrayMenu()
}

function exit () {
  const isRememberProfile =
    electronStore.get(
      'profile.isRemember'
    )

  if (!isRememberProfile) {
    electronStore.set(
      'profile.isLoggedIn',
      false
    )
  }

  mainWindow.webContents.send(
    'handle-exit'
  )
}

function prependTabToTabs (
  tab
) {
  tabs = [
    tab,
    ...tabs
  ]
}

function findTab (
  tabId
) {
  function isMatchedTab (
    tabData
  ) {
    return tabData.uuid === tabId
  }

  return getTabs().find(
    isMatchedTab
  )
}

function getTabs () {
  return mainWindow.getBrowserViews()
}

function removeTab (
  tab
) {
  if (tab) {
    mainWindow.removeBrowserView(
      tab
    )

    if (isDevelopment) {
      tab.webContents.closeDevTools()
    }

    tab.webContents.destroy()
  }
}

function removeTabFromTabs (
  tabId
) {
  function isMatchedTab (
    tabData
  ) {
    return tabData.uuid !== tabId
  }

  tabs = tabs.filter(
    isMatchedTab
  )
}
