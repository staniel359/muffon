const {
  ipcMain
} = require(
  'electron'
)
const {
  handleSetTitle,
  handleClearCache,
  handleSetLanguage,
  handleSetScale,
  handleCheckNativeTheme,
  handleLogout,
  handleAccountDelete,
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
  'set-scale',
  handleSetScale
)

ipcMain.handle(
  'check-native-theme',
  handleCheckNativeTheme
)

ipcMain.on(
  'logout',
  handleLogout
)

ipcMain.on(
  'account-delete',
  handleAccountDelete
)

ipcMain.on(
  'exit',
  handleExit
)
