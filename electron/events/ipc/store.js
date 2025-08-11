import {
  ipcMain
} from 'electron'
import {
  handleCallUpdateStore
} from '../../handlers/ipc/store.js'

export default function () {
  ipcMain.handle(
    'call-update-store',
    handleCallUpdateStore
  )
}
