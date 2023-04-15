import {
  ipcMain
} from 'electron'
import {
  handleSaveAudio,
  handleDeleteAudio
} from '../../handlers/ipc/audio.js'

export default function () {
  ipcMain.handle(
    'save-audio',
    handleSaveAudio
  )

  ipcMain.handle(
    'delete-audio',
    handleDeleteAudio
  )
}
