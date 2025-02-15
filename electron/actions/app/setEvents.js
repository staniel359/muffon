import setAppEvents from '../../events/app.js'
import setElectronStoreEvents from '../../events/electronStore.js'
import setNativeThemeEvents from '../../events/nativeTheme.js'
import setIpcAppEvents from '../../events/ipc/app.js'
import setIpcWindowEvents from '../../events/ipc/window.js'
import setIpcTabEvents from '../../events/ipc/tab.js'
import setIpcTabsEvents from '../../events/ipc/tabs.js'
import setIpcStoreEvents from '../../events/ipc/store.js'
import setIpcAudioFileEvents from '../../events/ipc/audioFile.js'
import setIpcRemoteAudioFileEvents from '../../events/ipc/remoteAudioFile.js'
import setIpcBackgroundImageEvents from '../../events/ipc/backgroundImage.js'
import setIpcFileEvents from '../../events/ipc/file.js'
import setIpcElectronStoreEvents from '../../events/ipc/electronStore.js'
import setIpcDiscordEvents from '../../events/ipc/discord.js'

export default function () {
  setAppEvents()

  setElectronStoreEvents()

  setNativeThemeEvents()

  setIpcAppEvents()

  setIpcWindowEvents()

  setIpcTabEvents()

  setIpcTabsEvents()

  setIpcStoreEvents()

  setIpcAudioFileEvents()

  setIpcRemoteAudioFileEvents()

  setIpcBackgroundImageEvents()

  setIpcFileEvents()

  setIpcElectronStoreEvents()

  setIpcDiscordEvents()
}
