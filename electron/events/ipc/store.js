import {
  ipcMain
} from 'electron'
import {
  handleUpdateStore
} from '../../handlers/ipc/store.js'

export default function set () {
  ipcMain.handle(
    'update-store',
    handleUpdateStore
  )
}
