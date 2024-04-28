import {
  nativeTheme
} from 'electron'
import getElectronStoreKey from '../electronStore/getKey.js'

export default function () {
  const isWithSystemTheme =
    getElectronStoreKey(
      'layout.isWithSystemTheme'
    )

  if (isWithSystemTheme) {
    const isDarkMode =
      nativeTheme.shouldUseDarkColors

    const data = {
      isDarkMode
    }

    mainView
      .webContents
      .send(
        'native-theme-updated',
        data
      )
  }
}
