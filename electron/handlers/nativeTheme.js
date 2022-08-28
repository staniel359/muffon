const electronStore = require(
  '../electronStore'
)
const updateTheme = require(
  '../actions/app/updateTheme'
)

function handleNativeThemeUpdated () {
  const isWithSystemTheme =
    electronStore.get(
      'layout.isWithSystemTheme'
    )

  if (isWithSystemTheme) {
    updateTheme()
  }
}

module.exports = {
  handleNativeThemeUpdated
}
