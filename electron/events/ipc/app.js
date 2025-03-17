import {
  ipcMain
} from 'electron'
import {
  handleSetTitle,
  handleClearCache,
  handleSetLanguage,
  handleCheckNativeTheme,
  handleCheckIfIsDevelopment,
  handleLogout,
  handleAccountDelete,
  handleNavigate,
  handleCallOpenDeepLink,
  handleGetSystemName,
  handleCallQuit,
  handleQuit
} from '../../handlers/ipc/app.js'

export default function () {
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

  ipcMain.handle(
    'check-native-theme',
    handleCheckNativeTheme
  )

  ipcMain.handle(
    'check-if-is-development',
    handleCheckIfIsDevelopment
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
    'navigate',
    handleNavigate
  )

  ipcMain.on(
    'call-open-deep-link',
    handleCallOpenDeepLink
  )

  ipcMain.handle(
    'get-system-name',
    handleGetSystemName
  )

  ipcMain.on(
    'call-quit',
    handleCallQuit
  )

  ipcMain.on(
    'quit',
    handleQuit
  )
}
