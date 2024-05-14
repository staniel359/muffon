import setTitle from '../../actions/app/setTitle.js'
import clearCache from '../../actions/app/clearCache.js'
import setLanguage from '../../actions/app/setLanguage.js'
import checkTheme from '../../actions/app/checkTheme.js'
import checkIfIsDevelopment from '../../actions/app/checkIfIsDevelopment.js'
import callLogout from '../../actions/app/callLogout.js'
import callAccountDelete from '../../actions/app/callAccountDelete.js'
import callNavigate from '../../actions/app/callNavigate.js'
import callOpenDeepLink from '../../actions/app/callOpenDeepLink.js'
import exit from '../../actions/app/exit.js'

export function handleSetTitle (
  _,
  value
) {
  setTitle(
    value
  )
}

export function handleClearCache () {
  return clearCache()
}

export function handleSetLanguage (
  _,
  value
) {
  setLanguage(
    value
  )
}

export function handleCheckNativeTheme () {
  return checkTheme()
}

export function handleCheckIfIsDevelopment () {
  return checkIfIsDevelopment()
}

export function handleLogout () {
  callLogout()
}

export function handleAccountDelete () {
  callAccountDelete()
}

export function handleNavigate (
  _,
  data
) {
  const dataFormatted =
    JSON.parse(
      data
    )

  callNavigate(
    dataFormatted
  )
}

export function handleCallOpenDeepLink () {
  callOpenDeepLink()
}

export function handleExit () {
  exit()
}
