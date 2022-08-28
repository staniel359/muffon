const {
  nativeTheme
} = require(
  'electron'
)

function updateTheme () {
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

module.exports = updateTheme
