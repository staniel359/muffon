const {
  ipcMain
} = require(
  'electron'
)
const {
  handleSetTitle,
  handleClearCache,
  handleSetLanguage,
  handleCheckNativeTheme,
  handleLogout,
  handleExit
} = require(
  '../../handlers/ipc/app'
)

ipcMain.on(
  'set-title',
  handleSetTitle
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
  'check-native-theme',
  handleCheckNativeTheme
)

ipcMain.on(
  'logout',
  handleLogout
)

ipcMain.on(
  'exit',
  handleExit
)
