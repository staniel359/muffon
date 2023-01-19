const appEvents = require(
  '../../events/app'
)
const nativeThemeEvents = require(
  '../../events/nativeTheme'
)
const ipcAppEvents = require(
  '../../events/ipc/app'
)
const ipcTrayEvents = require(
  '../../events/ipc/tray'
)
const ipcTabEvents = require(
  '../../events/ipc/tab'
)
const ipcTabsEvents = require(
  '../../events/ipc/tabs'
)
const ipcStoreEvents = require(
  '../../events/ipc/store'
)
const ipcAudioEvents = require(
  '../../events/ipc/audio'
)
const ipcBackgroundImageEvents = require(
  '../../events/ipc/backgroundImage'
)

function setEvents () {
  appEvents

  nativeThemeEvents

  ipcAppEvents

  ipcTrayEvents

  ipcTabEvents

  ipcTabsEvents

  ipcStoreEvents

  ipcAudioEvents

  ipcBackgroundImageEvents
}

module.exports = setEvents
