import setAppEvents from '../../events/app.js'
import setNativeThemeEvents from '../../events/nativeTheme.js'
import setIpcAppEvents from '../../events/ipc/app.js'
import setIpcTrayEvents from '../../events/ipc/tray.js'
import setIpcTabEvents from '../../events/ipc/tab.js'
import setIpcTabsEvents from '../../events/ipc/tabs.js'
import setIpcStoreEvents from '../../events/ipc/store.js'
import setIpcAudioEvents from '../../events/ipc/audio.js'
import setIpcBackgroundImageEvents from '../../events/ipc/backgroundImage.js'
import setIpcFileEvents from '../../events/ipc/file.js'
import setIpcElectronStoreEvents from '../../events/ipc/electronStore.js'

export default function () {
  setAppEvents()

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
}
