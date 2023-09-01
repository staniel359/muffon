import {
  nativeTheme
} from 'electron'
import getElectronStoreKey from '#/actions/electronStore/getKey'

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

    mainWindow
      .webContents
      .send(
        'native-theme-updated',
        data
      )
  }
}
