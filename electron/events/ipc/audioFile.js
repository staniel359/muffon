import {
  ipcMain
} from 'electron'
import {
  handleReadAudioFileMetadata
} from '#/handlers/ipc/audioFile'

export default function () {
  ipcMain.handle(
    'read-audio-file-metadata',
    handleReadAudioFileMetadata
  )
}
