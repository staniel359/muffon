import {
  isWindows,
  isLinux,
  isMacos
} from '../helpers/utils.js'
import openDeepLink from '../actions/app/openDeepLink.js'
import findTab from '../actions/tab/find.js'

export function handleAllWindowsClosed (
  event
) {
  event.preventDefault()
}

export function handleNewWindow (
  {
    url,
    tabId
  }
) {
  const tab =
    findTab(
      tabId
    )

  const data = {
    url
  }

  tab
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

    if (args && args.includes(
      '--open-about-window'
    )) {
      aboutWindow.show()
    }
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
  if (isMacos) {
    openDeepLink(
      {
        link
      }
    )
  }
}
