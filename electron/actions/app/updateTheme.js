import {
  nativeTheme
} from 'electron'

export default function updateTheme () {
  const isDarkMode =
    nativeTheme.shouldUseDarkColors

  const data = {
    isDarkMode
  }

  mainWindow
    .webContents
    .send(
      'update-native-theme',
      data
    )
}
