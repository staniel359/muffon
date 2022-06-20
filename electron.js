const {
  app,
  BrowserView,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  nativeImage,
  screen,
  session,
  shell,
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
const axios = require(
  'axios'
)

const appName = 'muffon'

const width = 800
const height = 600

const isDevelopment =
  process.env.NODE_ENV === 'development'

const isMac =
  process.platform === 'darwin'
const isLinux =
  process.platform === 'linux'

const publicPath =
  isDevelopment ? 'public' : ''

const iconPath =
  path.join(
    __dirname,
    publicPath,
    'logo.png'
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

const i18n = {
  en: {
    tray: {
      show: 'Show',
      hide: 'Hide',
      exit: 'Exit'
    },
    update: {
      message (
        version
      ) {
        return `Version ${version} is available!`
      },
      buttons: {
        download: 'Download',
        close: 'Close'
      }
    }
  },
  ru: {
    tray: {
      show: 'Открыть',
      hide: 'Скрыть',
      exit: 'Выйти'
    },
    update: {
      message (
        version
      ) {
        return `Доступна версия ${version}!`
      },
      buttons: {
        download: 'Скачать',
        close: 'Закрыть'
      }
    }
  }
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

let latestRelease
let latestVersion

let tabs = []

let isMaximized = false

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
  'logout',
  handleLogout
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
  data,
  {
    isSave
  }
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

  if (isSave) {
    mainWindow.webContents.send(
      'handle-update-electron-store',
      data
    )
  }
}

function handleUpdateTab (
  _,
  {
    tabId,
    data,
    isLoading,
    isError
  }
) {
  mainWindow.webContents.send(
    'handle-update-tab',
    {
      tabId,
      data,
      isLoading,
      isError
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

function handleLogout () {
  mainWindow.webContents.send(
    'handle-logout'
  )
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

  // mainWindow.webContents.openDevTools(
  //   {
  //     mode: 'detach'
  //   }
  // )

  function handleReadyToShow () {
    mainWindow.setMinimumSize(
      width,
      height
    )

    show()

    checkForUpdates()
  }

  mainWindow.once(
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

  function maximize () {
    const {
      width,
      height
    } = screen.getPrimaryDisplay().size

    mainWindow.setSize(
      width,
      height
    )
  }

  function handleMaximizeChange () {
    if (!isMaximized) {
      isMaximized = true

      maximize()
    }
  }

  function handleUnmaximizeChange () {
    isMaximized = false
  }

  if (isLinux) {
    mainWindow.on(
      'maximize',
      handleMaximizeChange
    )

    mainWindow.on(
      'unmaximize',
      handleUnmaximizeChange
    )
  }
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
  const localeData =
    i18n[language].tray

  const isVisible =
    mainWindow.isVisible()

  const toggleKey =
    isVisible ? 'hide' : 'show'

  const toggleAction =
    isVisible ? hide : show

  const menuItems = [
    {
      type: 'normal',
      label: localeData[toggleKey],
      click: toggleAction
    },
    {
      type: 'normal',
      label: localeData.exit,
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
  mainWindow.webContents.send(
    'handle-exit'
  )
}

function checkForUpdates () {
  const releasesUrl =
    'https://api.github.com/repos/staniel359/muffon/releases'

  axios.get(
    releasesUrl
  ).then(
    handleUpdateCheckSuccess
  )
}

function handleUpdateCheckSuccess (
  response
) {
  latestRelease = response.data[0]
  latestVersion = latestRelease.name

  const currentVersion = app.getVersion()

  const isNewVersionAvailable = (
    latestVersion !==
      currentVersion
  )

  if (isNewVersionAvailable) {
    showNewVersionNotification()
  }
}

function showNewVersionNotification () {
  const localeData = (
    i18n[language].update ||
      i18n.en.update
  )

  const options = {
    type: 'info',
    message: localeData.message(
      latestVersion
    ),
    buttons: [
      localeData.buttons.download,
      localeData.buttons.close
    ],
    defaultId: 0,
    cancelId: 1
  }

  dialog.showMessageBox(
    mainWindow,
    options
  ).then(
    handleNewVersionNotificationButtonClick
  )
}

function handleNewVersionNotificationButtonClick (
  {
    response
  }
) {
  if (response === 0) {
    const latestReleaseLink =
      latestRelease.html_url

    shell.openExternal(
      latestReleaseLink
    )
  }
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
