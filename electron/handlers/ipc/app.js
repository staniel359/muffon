const setTitle = require(
  '../../actions/app/setTitle'
)
const clearCache = require(
  '../../actions/app/clearCache'
)
const setLanguage = require(
  '../../actions/app/setLanguage'
)
const setScale = require(
  '../../actions/app/setScale'
)
const checkTheme = require(
  '../../actions/app/checkTheme'
)
const callLogout = require(
  '../../actions/app/callLogout'
)
const callAccountDelete = require(
  '../../actions/app/callAccountDelete'
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

function handleSetScale (
  _,
  value
) {
  setScale(
    value
  )
}

function handleCheckNativeTheme () {
  return checkTheme()
}

function handleLogout () {
  callLogout()
}

function handleAccountDelete () {
  callAccountDelete()
}

function handleExit () {
  exit()
}

module.exports = {
  handleSetTitle,
  handleClearCache,
  handleSetLanguage,
  handleSetScale,
  handleCheckNativeTheme,
  handleLogout,
  handleAccountDelete,
  handleExit
}
