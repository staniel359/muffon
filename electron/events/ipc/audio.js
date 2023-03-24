import {
  ipcMain
} from 'electron'
import {
  handleSaveAudio,
  handleDeleteAudio
} from '../../handlers/ipc/audio.js'

export default function set () {
  ipcMain.on(
    'save-audio',
    handleSaveAudio
  )

  ipcMain.on(
    'delete-audio',
    handleDeleteAudio
  )
}
