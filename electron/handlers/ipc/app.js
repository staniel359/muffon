const setTitle = require(
  '../../actions/app/setTitle'
)
const clearCache = require(
  '../../actions/app/clearCache'
)
const setLanguage = require(
  '../../actions/app/setLanguage'
)
const updateTheme = require(
  '../../actions/app/updateTheme'
)
const callLogout = require(
  '../../actions/app/callLogout'
)
const exit = require(
  '../../actions/app/exit'
)

function handleSetTitle (
  _,
  value
) {
  setTitle(
    value
  )
}

function handleClearCache () {
  return clearCache()
}

function handleSetLanguage (
  _,
  value
) {
  setLanguage(
    value
  )
}

function handleCheckNativeTheme () {
  updateTheme()
}

function handleLogout () {
  callLogout()
}

function handleExit () {
  exit()
}

module.exports = {
  handleSetTitle,
  handleClearCache,
  handleSetLanguage,
  handleCheckNativeTheme,
  handleLogout,
  handleExit
}
