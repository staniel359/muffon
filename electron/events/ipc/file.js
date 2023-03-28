import {
  ipcMain
} from 'electron'
import {
  handleReadFile,
  handleReadFileDetails,
  handleDecryptFile
} from '../../handlers/ipc/file.js'

export default function set () {
  ipcMain.handle(
    'read-file',
    handleReadFile
  )

  ipcMain.handle(
    'read-file-details',
    handleReadFileDetails
  )

  ipcMain.handle(
    'decrypt-file',
    handleDecryptFile
  )
}
