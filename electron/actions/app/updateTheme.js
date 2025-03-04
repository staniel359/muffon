import {
  nativeTheme
} from 'electron'
import getSettingsKey from '../settings/getKey.js'

export default function () {
  const isWithSystemTheme =
    getSettingsKey(
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
