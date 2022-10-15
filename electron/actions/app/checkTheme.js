const {
  nativeTheme
} = require(
  'electron'
)

function checkTheme () {
  const isDarkMode =
    nativeTheme.shouldUseDarkColors

  return {
    isDarkMode
  }
}

module.exports = checkTheme
