import setTitle from '#/actions/app/setTitle'
import clearCache from '#/actions/app/clearCache'
import setLanguage from '#/actions/app/setLanguage'
import checkTheme from '#/actions/app/checkTheme'
import callLogout from '#/actions/app/callLogout'
import callAccountDelete from '#/actions/app/callAccountDelete'
import callNavigate from '#/actions/app/callNavigate'
import exit from '#/actions/app/exit'

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

export function handleExit () {
  exit()
}
