const {
  nativeTheme
} = require(
  'electron'
)
const {
  handleNativeThemeUpdated
} = require(
  '../handlers/nativeTheme'
)

nativeTheme.on(
  'updated',
  handleNativeThemeUpdated
)
