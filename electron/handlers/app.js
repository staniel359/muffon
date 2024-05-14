import {
  isWindows,
  isLinux,
  isMac
} from '../helpers/utils.js'
import openDeepLink from '../actions/app/openDeepLink.js'

export function handleAllWindowsClosed (
  event
) {
  event.preventDefault()
}

export function handleNewWindow (
  {
    url
  }
) {
  const data = {
    url
  }

  mainWindow
    .webContents
    .send(
      'open-external-url',
      data
    )

  return {
    action: 'deny'
  }
}

export function handleSecondInstance (
  _,
  args
) {
  if (mainWindow) {
    mainWindow.show()

    mainWindow.focus()
  }

  if (isWindows || isLinux) {
    openDeepLink(
      {
        args
      }
    )
  }
}

export function handleOpenUrl (
  _,
  link
) {
  if (isMac) {
    openDeepLink(
      {
        link
      }
    )
  }
}
