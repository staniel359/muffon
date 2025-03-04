import {
  ipcMain
} from 'electron'
import {
  handleGetSettings,
  handleGetSettingsKey,
  handleAddSettingsKeyValue,
  handleDeleteSettingsKeyValue
} from '../../handlers/ipc/settings.js'

export default function () {
  ipcMain.handle(
    'get-settings',
    handleGetSettings
  )

  ipcMain.handle(
    'get-settings-key',
    handleGetSettingsKey
  )

  ipcMain.handle(
    'add-settings-key-value',
    handleAddSettingsKeyValue
  )

  ipcMain.handle(
    'delete-settings-key-value',
    handleDeleteSettingsKeyValue
  )
}
