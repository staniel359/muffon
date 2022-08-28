const {
  ipcMain
} = require(
  'electron'
)
const {
  handleSaveAudio,
  handleDeleteAudio
} = require(
  '../../handlers/ipc/audio'
)

ipcMain.on(
  'save-audio',
  handleSaveAudio
)

ipcMain.on(
  'delete-audio',
  handleDeleteAudio
)
