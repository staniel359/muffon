import {
  ipcMain
} from 'electron'
import {
  handleUpdateStore
} from '#/handlers/ipc/store'

export default function () {
  ipcMain.handle(
    'update-store',
    handleUpdateStore
  )
}
