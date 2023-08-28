import {
  ipcMain
} from 'electron'
import {
  handleSetTitle,
  handleClearCache,
  handleSetLanguage,
  handleCheckNativeTheme,
  handleLogout,
  handleAccountDelete,
  handleNavigate,
  handleCallOpenDeepLink,
  handleExit
} from '#/handlers/ipc/app'

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

  ipcMain.on(
    'exit',
    handleExit
  )
}
