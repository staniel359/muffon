const setTitle = require(
  '../../actions/app/setTitle'
)
const clearCache = require(
  '../../actions/app/clearCache'
)
const setLanguage = require(
  '../../actions/app/setLanguage'
)
const checkTheme = require(
  '../../actions/app/checkTheme'
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
  return checkTheme()
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
