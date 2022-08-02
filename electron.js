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
const fs = require(
  'fs'
)
const ElectronStore = require(
  'electron-store'
)
const {
  download
} = require(
  'electron-dl'
)
const axios = require(
  'axios'
)
const generateKey = require(
  'uuid'
).v4
const crypto = require(
  'crypto'
)
const i18n = require(
  'i18n'
)

process.env.MUFFON_ELECTRON_STORE_ENCRYPTION_KEY =
  'secretKey'

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

const userDataPath =
  app.getPath(
    'userData'
  )

const audioFolderPath =
  path.join(
    userDataPath,
    'audio'
  )

const backgroundImagesFolderPath =
  path.join(
    userDataPath,
    'background_images'
  )

const electronStoreEncryptionKey =
  process.env.MUFFON_ELECTRON_STORE_ENCRYPTION_KEY

const electronStore =
  new ElectronStore(
    {
      accessPropertiesByDotNotation: false,
      encryptionKey: electronStoreEncryptionKey
    }
  )

const defaultLocale =
  electronStore.get(
    'profile.language',
    'en'
  )

const locales = {
  en: {
    tray: {
      show: 'Show',
      hide: 'Hide',
      exit: 'Exit'
    },
    update: {
      message: 'Version {version} is available',
      buttons: {
        download: 'Download',
        close: 'Close'
      }
    }
  },
  ru: {
    tray: {
      show: 'Показать',
      hide: 'Скрыть',
      exit: 'Выйти'
    },
    update: {
      message: 'Доступна версия {version}',
      buttons: {
        download: 'Скачать',
        close: 'Закрыть'
      }
    }
  }
}

i18n.configure(
  {
    locales: [
      'en',
      'ru'
    ],
    defaultLocale,
    staticCatalog: locales,
    mustacheConfig: {
      tags: [
        '{',
        '}'
      ]
    },
    objectNotation: true
  }
)

let mainWindow
let tray

let latestRelease
let latestVersion

let isMaximized = false

// App initialization

app.whenReady().then(
  setup
)

app.setAppUserModelId(
  appName
)

// App events

app.on(
  'window-all-closed',
  handleAllWindowsClosed
)

app.on(
  'activate',
  handleActivate
)

// IPC events

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
  'set-active-tab',
  handleSetActiveTab
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
  'save-audio',
  handleSaveAudio
)

ipcMain.on(
  'delete-audio',
  handleDeleteAudio
)

ipcMain.on(
  'change-background-image',
  handleChangeBackgroundImage
)

ipcMain.on(
  'reset-background-image',
  handleResetBackgroundImage
)

ipcMain.on(
  'delete-background-image',
  handleDeleteBackgroundImage
)

ipcMain.on(
  'logout',
  handleLogout
)

ipcMain.on(
  'exit',
  handleExit
)

// App event handlers

function handleAllWindowsClosed (
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

// IPC event handlers

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

  const isSwitchToNewTab =
    electronStore.get(
      'layout.isSwitchToNewTab'
    )

  if (!isSwitchToNewTab) {
    setActiveTab(
      getActiveTabId()
    )
  }

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
    'add-tab',
    value
  )

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

function handleSetActiveTab (
  _,
  tabId
) {
  setActiveTab(
    tabId
  )
}

function handleRemoveTab (
  _,
  tabId
) {
  if (
    isReplaceActiveTab(
      tabId
    )
  ) {
    replaceActiveTab(
      tabId
    )
  }

  removeTab(
    tabId
  )
}

function handleClearTabs () {
  function getTabId (
    tabData
  ) {
    return tabData.uuid
  }

  const tabIds =
    getTabs().map(
      getTabId
    )

  tabIds.forEach(
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
      'update-store',
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
      'update-electron-store',
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
    'update-tab',
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
  i18n.setLocale(
    value
  )

  setTrayMenu()
}

function handleSaveAudio (
  _,
  {
    track,
    tabId
  }
) {
  const trackData =
    JSON.parse(
      track
    )

  const url = trackData.audio.link

  const fileName = generateKey()

  const tempFileName = `${fileName}-temp`

  const options = {
    directory: audioFolderPath,
    filename: tempFileName
  }

  const tab =
    findTab(
      tabId
    )

  function formatTrackData (
    key,
    iv
  ) {
    delete trackData.audio.link

    trackData.uuid = fileName

    const filePath =
      path.join(
        audioFolderPath,
        fileName
      )

    trackData.audio.local = {
      path: filePath,
      key,
      iv
    }
  }

  function handleSuccess (
    downloadItem
  ) {
    const {
      key,
      iv
    } = encryptAudioFile(
      tempFileName,
      fileName
    )

    formatTrackData(
      key,
      iv
    )

    tab.webContents.send(
      'save-audio-complete',
      {
        trackData
      }
    )
  }

  function handleError () {
    tab.webContents.send(
      'save-audio-error'
    )
  }

  download(
    mainWindow,
    url,
    options
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}

function handleDeleteAudio (
  _,
  {
    fileName
  }
) {
  deleteAudioFile(
    fileName
  )
}

function handleChangeBackgroundImage (
  _,
  {
    imageId,
    imageUrl
  }
) {
  const fileName = imageId.toString()

  const imagePath = path.join(
    backgroundImagesFolderPath,
    fileName
  )

  const isFileExist =
    fs.existsSync(
      imagePath
    )

  function handleSuccess () {
    mainWindow.webContents.send(
      'change-background-image',
      {
        imageId,
        imagePath
      }
    )
  }

  function downloadImage () {
    const options = {
      directory:
        backgroundImagesFolderPath,
      filename: fileName
    }

    download(
      mainWindow,
      imageUrl,
      options
    ).then(
      handleSuccess
    )
  }

  if (isFileExist) {
    handleSuccess()
  } else {
    downloadImage()
  }
}

function handleResetBackgroundImage () {
  mainWindow.webContents.send(
    'reset-background-image'
  )
}

function handleDeleteBackgroundImage (
  _,
  {
    imageId
  }
) {
  mainWindow.webContents.send(
    'delete-background-image',
    {
      imageId
    }
  )
}

function handleLogout () {
  mainWindow.webContents.send(
    'logout'
  )
}

function handleExit () {
  app.exit()
}

// Functions

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

    const isMaximize =
      electronStore.get(
        'layout.isMaximizeOnStart'
      )

    if (isMaximize) {
      mainWindow.maximize()
    }

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

    const isExitOnClose =
      electronStore.get(
        'layout.isExitOnClose'
      )

    if (isExitOnClose) {
      exit()
    } else {
      hide()
    }
  }

  mainWindow.on(
    'close',
    handleClose
  )

  mainWindow.webContents.on(
    'new-window',
    handleNewWindow
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
  const isVisible =
    mainWindow.isVisible()

  const toggleKey =
    isVisible ? 'hide' : 'show'

  const toggleAction =
    isVisible ? hide : show

  const menuItems = [
    {
      type: 'normal',
      label: i18n.__(
        `tray.${toggleKey}`
      ),
      click: toggleAction
    },
    {
      type: 'normal',
      label: i18n.__(
        'tray.exit'
      ),
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
    'exit'
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
  const options = {
    type: 'info',
    message: i18n.__(
      'update.message',
      {
        version: latestVersion
      }
    ),
    buttons: [
      i18n.__(
        'update.buttons.download'
      ),
      i18n.__(
        'update.buttons.close'
      )
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

function findTabIndex (
  tabId
) {
  function isMatchedTab (
    tabData
  ) {
    return tabData.uuid === tabId
  }

  return getTabs().findIndex(
    isMatchedTab
  )
}

function getTabs () {
  return mainWindow.getBrowserViews()
}

function removeTab (
  tabId
) {
  const tab = findTab(
    tabId
  )

  if (tab) {
    mainWindow.removeBrowserView(
      tab
    )

    if (isDevelopment) {
      tab.webContents.closeDevTools()
    }

    tab.webContents.destroy()

    mainWindow.webContents.send(
      'remove-tab',
      tabId
    )
  }
}

function getActiveTabId () {
  return electronStore.get(
    'layout.activeTabId'
  )
}

function setActiveTab (
  tabId
) {
  const tab = findTab(
    tabId
  )

  mainWindow.setTopBrowserView(
    tab
  )

  mainWindow.webContents.send(
    'set-active-tab',
    tabId
  )
}

function isReplaceActiveTab (
  tabId
) {
  const isMultipleTabs =
    getTabs().length > 1

  const isActive = (
    tabId === getActiveTabId()
  )

  return (
    isMultipleTabs &&
      isActive
  )
}

function replaceActiveTab (
  tabId
) {
  const tabIndex =
    findTabIndex(
      tabId
    )

  const newActiveTabIndex =
    tabIndex ? (tabIndex - 1) : 1

  const newActiveTabId =
    getTabs()[
      newActiveTabIndex
    ].uuid

  setActiveTab(
    newActiveTabId
  )
}

function encryptAudioFile (
  tempFileName,
  fileName
) {
  const file =
    openAudioFile(
      tempFileName
    )

  const {
    key,
    iv,
    encryptedFile
  } = encryptFile(
    file
  )

  createAudioFile(
    fileName,
    encryptedFile
  )

  deleteAudioFile(
    tempFileName
  )

  return {
    key,
    iv
  }
}

function encryptFile (
  file
) {
  function getRandomKey (
    bytesSize
  ) {
    return crypto.randomBytes(
      bytesSize
    ).toString(
      'hex'
    )
  }

  const key =
    getRandomKey(
      16
    )

  const iv =
    getRandomKey(
      8
    )

  const cipher =
    crypto.createCipheriv(
      'aes-256-cbc',
      key,
      iv
    )

  const encryptedFile = Buffer.concat(
    [
      cipher.update(
        file
      ),
      cipher.final()
    ]
  )

  return {
    key,
    iv,
    encryptedFile
  }
}

function openAudioFile (
  fileName
) {
  const filePath =
    path.join(
      audioFolderPath,
      fileName
    )

  return fs.readFileSync(
    filePath
  )
}

function createAudioFile (
  fileName,
  data
) {
  const filePath =
    path.join(
      audioFolderPath,
      fileName
    )

  fs.writeFileSync(
    filePath,
    data
  )
}

function deleteAudioFile (
  fileName
) {
  const filePath =
    path.join(
      audioFolderPath,
      fileName
    )

  fs.unlinkSync(
    filePath,
    () => true
  )
}

function handleNewWindow (
  event
) {
  event.preventDefault()
}
