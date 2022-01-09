const {
  app,
  BrowserView,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  session,
  Tray
} = require('electron')
const path = require('path')
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

const getBaseUrl = () => {
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

const baseUrl = getBaseUrl()

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
  const userDataPath = path.join(
    __dirname,
    'electron_data'
  )

  app.setPath(
    'userData',
    userDataPath
  )
}

const local = new ElectronStore({
  accessPropertiesByDotNotation: false
})

let language = local.get(
  'profile.language', 'en'
)

let mainWindow
let tray

let tabs = []

const setTrayMenu = () => {
  const showHideText =
    mainWindow.isVisible() ? 'hide' : 'show'

  const showHideAction =
    mainWindow.isVisible() ? hide : show

  const menu = Menu.buildFromTemplate([
    {
      type: 'normal',
      label: i18n[language][showHideText],
      click: showHideAction
    },
    {
      type: 'normal',
      label: i18n[language].exit,
      click: exit
    }
  ])

  tray.setContextMenu(menu)

  if (isMac) {
    app.dock.setMenu(menu)
  }
}

const show = () => {
  mainWindow.show()

  setTrayMenu()
}

const hide = () => {
  mainWindow.hide()

  setTrayMenu()
}

const createWindow = () => {
  const mainWindowIcon =
    icon.resize({
      width: 64,
      height: 64
    })

  mainWindow = new BrowserWindow({
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
  })

  mainWindow.loadURL(baseUrl)
  mainWindow.setMenu(null)

  const handleReadyToShow = () => {
    mainWindow.setMinimumSize(
      width, height
    )

    show()
  }

  mainWindow.on(
    'ready-to-show',
    handleReadyToShow
  )

  const handleClose = event => {
    event.preventDefault()

    hide()
  }

  mainWindow.on(
    'close',
    handleClose
  )
}

const exit = () => {
  const isRememberProfile = local.get(
    'profile.isRemember'
  )

  if (!isRememberProfile) {
    local.set(
      'profile.isLoggedIn',
      false
    )
  }

  mainWindow.webContents.send(
    'handle-exit'
  )
}

const createTray = () => {
  const trayIcon =
    icon.resize({
      width: 16,
      height: 16
    })

  tray = new Tray(trayIcon)

  setTrayMenu()

  tray.setToolTip(appName)

  const handleClick = () => {
    mainWindow.show()
  }

  tray.on(
    'click',
    handleClick
  )
}

const createHeadersHandler = () => {
  const filter = {
    urls: ['https://*.youtube.com/*']
  }

  session
    .defaultSession
    .webRequest
    .onBeforeSendHeaders(filter, (details, request) => {
      details.requestHeaders.Referer =
        'https://www.youtube.com'

      request({
        cancel: false,
        requestHeaders: details.requestHeaders
      })
    })
}

const setup = () => {
  ElectronStore.initRenderer()

  createWindow()
  createTray()
  createHeadersHandler()
}

app.whenReady().then(
  setup
)

app.setAppUserModelId(
  appName
)

// App event handlers

const handleAllWindowsClose = event => {
  event.preventDefault()
}

app.on(
  'window-all-closed',
  handleAllWindowsClose
)

const handleActivate = () => {
  const isAnyWindowsOpen =
    !!BrowserWindow.getAllWindows().length

  if (!isAnyWindowsOpen) {
    createWindow()
  }
}

app.on(
  'activate',
  handleActivate
)

// IPC event handlers

// Set title

const handleSetTitle = (_, value) => {
  mainWindow.setTitle(
    value || appName
  )
}

ipcMain.on(
  'set-title',
  handleSetTitle
)

// Set tray tooltip

const handleSetTrayTooltip = (_, value) => {
  tray.setToolTip(value)
}

ipcMain.on(
  'set-tray-tooltip',
  handleSetTrayTooltip
)

// Add tab

const handleAddTab = (_, value) => {
  const { uuid, path } = value

  const tab = new BrowserView({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  tab.uuid = uuid

  mainWindow.addBrowserView(tab)

  prependTabToTabs(tab)

  const [width, height] =
    mainWindow.getContentSize()

  const tabsPanelHeight = 45

  tab.setBounds({
    x: 0,
    y: tabsPanelHeight,
    width,
    height: height - tabsPanelHeight
  })

  tab.setAutoResize({
    width: true,
    height: true
  })

  tab.webContents.loadURL(
    `${baseUrl}#/${path}`
  )

  if (isDevelopment) {
    tab.webContents.openDevTools({
      mode: 'right'
    })
  }

  mainWindow.webContents.send(
    'handle-add-tab',
    value
  )

  const handleNewWindow = event => {
    event.preventDefault()
  }

  const handleDidStartNavigation = () => {
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

const prependTabToTabs = tab => {
  tabs = [tab, ...tabs]
}

ipcMain.on(
  'add-tab',
  handleAddTab
)

// Set top tab

const handleSetTopTab = (_, tabId) => {
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

const findTab = tabId => {
  const isMatchedTab = tabData => {
    return tabData.uuid === tabId
  }

  return getTabs().find(
    isMatchedTab
  )
}

const getTabs = () => {
  return mainWindow.getBrowserViews()
}

const removeTabFromTabs = tabId => {
  const isMatchedTab = tabData => {
    return tabData.uuid !== tabId
  }

  tabs = tabs.filter(
    isMatchedTab
  )
}

ipcMain.on(
  'set-top-tab',
  handleSetTopTab
)

// Remove tab

const handleRemoveTab = (_, tabId) => {
  removeTab(
    findTab(tabId)
  )

  removeTabFromTabs(tabId)

  mainWindow.webContents.send(
    'handle-remove-tab',
    tabId
  )

  if (tabs.length) {
    mainWindow.webContents.send(
      'handle-set-top-tab',
      tabs[0].uuid
    )
  }
}

const removeTab = tab => {
  if (tab) {
    mainWindow.removeBrowserView(tab)

    if (isDevelopment) {
      tab.webContents.closeDevTools()
    }

    tab.webContents.destroy()
  }
}

ipcMain.on(
  'remove-tab',
  handleRemoveTab
)

// Clear tabs

const handleClearTabs = () => {
  getTabs().forEach(
    removeTab
  )
}

ipcMain.on(
  'clear-tabs',
  handleClearTabs
)

// Update store

const handleUpdateStore = (_, data) => {
  const updateViewStore = view => {
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

ipcMain.handle(
  'update-store',
  handleUpdateStore
)

// Update tab

const handleUpdateTab = (_, { tabId, data }) => {
  mainWindow.webContents.send(
    'handle-update-tab',
    { tabId, data }
  )
}

ipcMain.on(
  'update-tab',
  handleUpdateTab
)

// Clear cache

const handleClearCache = () => {
  return mainWindow
    .webContents
    .session
    .clearCache()
}

ipcMain.handle(
  'clear-cache',
  handleClearCache
)

// Set language

const handleSetLanguage = (_, value) => {
  language = value

  setTrayMenu()
}

ipcMain.on(
  'set-language',
  handleSetLanguage
)

// Exit

const handleExit = () => {
  app.exit()
}

ipcMain.on(
  'exit',
  handleExit
)
