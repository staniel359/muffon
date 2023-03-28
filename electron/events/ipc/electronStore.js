import {
  ipcMain
} from 'electron'
import {
  handleGetElectronStoreData,
  handleGetElectronStoreKey,
  handleAddElectronStoreValue,
  handleDeleteElectronStoreValue,
  handleSetElectronStoreData,
  handleDeleteElectronStoreKey
} from '../../handlers/ipc/electronStore.js'

export default function set () {
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

  ipcMain.handle(
    'set-electron-store-data',
    handleSetElectronStoreData
  )

  ipcMain.handle(
    'delete-electron-store-key',
    handleDeleteElectronStoreKey
  )
}
