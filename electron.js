const {
  app,
  BrowserView,
  BrowserWindow,
  ipcMain,
  Menu,
  session,
  Tray
} = require('electron')
const path = require('path')
const ElectronStore = require('electron-store')

const appName = 'muffon'
const width = 800
const height = 600
const isDevelopment =
  process.env.NODE_ENV === 'development'

const osIcons = {
  win32: 'icon.ico',
  darwin: 'icon.icns',
  linux: 'icon.png'
}
const iconName = osIcons[
  process.platform
]

const iconPath = path.join(
  __dirname,
  (isDevelopment ? 'public' : ''),
  iconName
)

const getBaseUrl = () => {
  const developmentBaseUrl =
    'http://localhost:3000/'

  const productionPath = path.join(
    __dirname,
    'index.html'
  )
  const productionBaseUrl =
    `file://${productionPath}`

  if (isDevelopment) {
    return developmentBaseUrl
  } else {
    return productionBaseUrl
  }
}

const baseUrl = getBaseUrl()

const i18n = {
  en: {
    show: 'Show',
    hide: 'Hide',
    quit: 'Quit'
  },
  it: {
    show: 'Mostra',
    hide: 'Nascondi',
    quit: 'Esci'
  },
  ru: {
    show: 'Открыть',
    hide: 'Скрыть',
    quit: 'Выйти'
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

let lang = local.get(
  'profile.language'
) || 'en'
let mainWindow = null
let tray = null
let tabs = []

const show = () => {
  mainWindow.show()

  setTrayMenu()
}

const hide = () => {
  mainWindow.hide()

  setTrayMenu()
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width,
    height,
    icon: iconPath,
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

  const handleClose = event => {
    event.preventDefault()

    hide()
  }

  mainWindow.on(
    'ready-to-show',
    handleReadyToShow
  )

  mainWindow.on(
    'close',
    handleClose
  )
}

const quit = () => {
  const isRememberProfile = local.get(
    'profile.isRemember'
  )

  if (!isRememberProfile) {
    local.set(
      'profile.isLoggedIn',
      false
    )
  }

  app.exit()
}

const setTrayMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      type: 'normal',
      label: i18n[lang][
        mainWindow.isVisible() ? 'hide' : 'show'
      ],
      click: mainWindow.isVisible() ? hide : show
    },
    {
      type: 'normal',
      label: i18n[lang].quit,
      click: quit
    }
  ])

  tray.setContextMenu(menu)

  const isMac =
    process.platform === 'darwin'

  if (isMac) {
    app.dock.setMenu(menu)
  }
}

const createTrayOrDock = () => {
  tray = new Tray(iconPath)

  setTrayMenu()

  tray.setToolTip(appName)

  const handleTrayIconClick = () => {
    mainWindow.show()
  }

  tray.on(
    'click',
    handleTrayIconClick
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
  createTrayOrDock()
  createHeadersHandler()
}

app.whenReady().then(setup)

app.setAppUserModelId(appName)

const handleAllWindowsClose = event => {
  event.preventDefault()
}

const handleActivate = () => {
  const isAnyWindowsOpen =
    !!BrowserWindow.getAllWindows().length

  if (!isAnyWindowsOpen) {
    createWindow()
  }
}

app.on(
  'window-all-closed',
  handleAllWindowsClose
)

app.on(
  'activate',
  handleActivate
)

const handleSetTitle = (_, value) => {
  mainWindow.setTitle(
    value || appName
  )
}

const handleSetTrayTooltip = (_, value) => {
  tray.setToolTip(value)
}

const prependTabToTabs = tab => {
  tabs = [tab, ...tabs]
}

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

const getTabs = () => {
  return mainWindow.getBrowserViews()
}

const findTab = tabId => {
  const isMatchedTab = tabData => {
    return tabData.uuid === tabId
  }

  return getTabs().find(
    isMatchedTab
  )
}

const removeTabFromTabs = tabId => {
  const isMatchedTab = tabData => {
    return tabData.uuid !== tabId
  }

  tabs = tabs.filter(
    isMatchedTab
  )
}

const handleSetTopTab = (_, tabId) => {
  const tab = findTab(tabId)

  mainWindow.setTopBrowserView(tab)

  removeTabFromTabs(tabId)
  prependTabToTabs(tab)

  mainWindow.webContents.send(
    'handle-set-top-tab',
    tabId
  )
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

const handleClearTabs = () => {
  getTabs().forEach(removeTab)
}

const getViews = () => {
  return [mainWindow, ...getTabs()]
}

const handleUpdateStore = (_, data) => {
  const updateViewStore = view => {
    view.webContents.send(
      'handle-update-store',
      data
    )
  }

  getViews().forEach(
    updateViewStore
  )
}

const handleUpdateTab = (_, { tabId, data }) => {
  mainWindow.webContents.send(
    'handle-update-tab',
    { tabId, data }
  )
}

const handleClearCache = () => {
  return mainWindow.webContents.session.clearCache()
}

const handleSetLanguage = (_, value) => {
  lang = value

  setTrayMenu()
}

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
