import {
  ipcMain
} from 'electron'
import {
  handleUpdateStore
} from '../../handlers/ipc/store.js'

export default function () {
  ipcMain.handle(
    'update-store',
    handleUpdateStore
  )
}
