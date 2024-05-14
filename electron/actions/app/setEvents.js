import setAppEvents from '../../events/app.js'
import setElectronStoreEvents from '../../events/electronStore.js'
import setNativeThemeEvents from '../../events/nativeTheme.js'
import setIpcAppEvents from '../../events/ipc/app.js'
import setIpcTrayEvents from '../../events/ipc/tray.js'
import setIpcTabEvents from '../../events/ipc/tab.js'
import setIpcTabsEvents from '../../events/ipc/tabs.js'
import setIpcStoreEvents from '../../events/ipc/store.js'
import setIpcAudioFileEvents from '../../events/ipc/audioFile.js'
import setIpcBackgroundImageEvents from '../../events/ipc/backgroundImage.js'
import setIpcFileEvents from '../../events/ipc/file.js'
import setIpcElectronStoreEvents from '../../events/ipc/electronStore.js'
import setIpcDiscordEvents from '../../events/ipc/discord.js'

export default function () {
  setAppEvents()

  setElectronStoreEvents()

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
