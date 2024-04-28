import setAppEvents from '#/events/app'
import setElectronStoreEvents from '#/events/electronStore'
import setNativeThemeEvents from '#/events/nativeTheme'
import setIpcAppEvents from '#/events/ipc/app'
import setIpcTrayEvents from '#/events/ipc/tray'
import setIpcTabEvents from '#/events/ipc/tab'
import setIpcTabsEvents from '#/events/ipc/tabs'
import setIpcStoreEvents from '#/events/ipc/store'
import setIpcAudioEvents from '#/events/ipc/audio'
import setIpcBackgroundImageEvents from '#/events/ipc/backgroundImage'
import setIpcFileEvents from '#/events/ipc/file'
import setIpcElectronStoreEvents from '#/events/ipc/electronStore'
import setIpcDiscordEvents from '#/events/ipc/discord'
import setIpcAudioFileEvents from '#/events/ipc/audioFile'

export default function () {
  setAppEvents()

  setElectronStoreEvents()

  setNativeThemeEvents()

  setIpcAppEvents()

  setIpcTrayEvents()

  setIpcTabEvents()

  setIpcTabsEvents()

  setIpcStoreEvents()

  setIpcAudioEvents()

  setIpcBackgroundImageEvents()

  setIpcFileEvents()

  setIpcElectronStoreEvents()

  setIpcDiscordEvents()

  setIpcAudioFileEvents()
}
