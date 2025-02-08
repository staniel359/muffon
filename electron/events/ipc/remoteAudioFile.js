import {
  ipcMain
} from 'electron'
import {
  handleReadRemoteAudioFileMetadata
} from '../../handlers/ipc/remoteAudioFile.js'

export default function () {
  ipcMain.handle(
    'read-remote-audio-file-metadata',
    handleReadRemoteAudioFileMetadata
  )
}
