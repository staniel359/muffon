import setAppEvents from '#/events/app'
import setNativeThemeEvents from '#/events/nativeTheme'
import setIpcAppEvents from '#/events/ipc/app'
import setIpcTrayEvents from '#/events/ipc/tray'
import setIpcTabEvents from '#/events/ipc/tab'
import setIpcTabsEvents from '#/events/ipc/tabs'
import setIpcStoreEvents from '#/events/ipc/store'
import setIpcAudioFileEvents from '#/events/ipc/audioFile'
import setIpcBackgroundImageEvents from '#/events/ipc/backgroundImage'
import setIpcFileEvents from '#/events/ipc/file'
import setIpcElectronStoreEvents from '#/events/ipc/electronStore'
import setIpcDiscordEvents from '#/events/ipc/discord'

export default function () {
  setAppEvents()

  setNativeThemeEvents()

  setIpcAppEvents()

  setIpcTrayEvents()

  setIpcTabEvents()

  setIpcTabsEvents()

  setIpcStoreEvents()

  setIpcAudioFileEvents()

  setIpcBackgroundImageEvents()

  setIpcFileEvents()

  setIpcElectronStoreEvents()

  setIpcDiscordEvents()
}
