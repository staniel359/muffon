import {
  ipcMain
} from 'electron'
import {
  handleGetElectronStoreData,
  handleGetElectronStoreKey,
  handleAddElectronStoreValue,
  handleDeleteElectronStoreValue
} from '../../handlers/ipc/electronStore.js'

export default function () {
  ipcMain.handle(
    'get-electron-store-data',
    handleGetElectronStoreData
  )

  ipcMain.handle(
    'get-electron-store-key',
    handleGetElectronStoreKey
  )

  ipcMain.handle(
    'add-electron-store-value',
    handleAddElectronStoreValue
  )

  ipcMain.handle(
    'delete-electron-store-value',
    handleDeleteElectronStoreValue
  )
}
