import {
  ipcMain
} from 'electron'
import {
  handleSaveAudioFile,
  handleDeleteAudioFile,
  handleReadAudioFileMetadata
} from '#/handlers/ipc/audioFile'

export default function () {
  ipcMain.handle(
    'save-audio-file',
    handleSaveAudioFile
  )

  ipcMain.handle(
    'delete-audio-file',
    handleDeleteAudioFile
  )

  ipcMain.handle(
    'read-audio-file-metadata',
    handleReadAudioFileMetadata
  )
}
