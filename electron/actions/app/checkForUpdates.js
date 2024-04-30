import {
  app,
  dialog,
  shell,
  net
} from 'electron'
import {
  autoUpdater
} from 'electron-updater'
import {
  isMac
} from '#/helpers/utils'
import i18n from 'i18n'

let latestRelease
let latestVersion

function handleNotificationButtonClick (
  {
    response
  }
) {
  if (response === 0) {
    const latestReleaseLink =
      latestRelease.html_url

    shell.openExternal(
      latestReleaseLink
    )
  }
}

function showNotification () {
  const message =
    i18n.__(
      'update.message'
    )

  const downloadText =
    i18n.__(
      'update.buttons.download'
    )

  const closeText =
    i18n.__(
      'update.buttons.close'
    )

  const buttons = [
    downloadText,
    closeText
  ]

  const options = {
    type: 'info',
    message,
    detail: latestVersion,
    buttons,
    defaultId: 0,
    cancelId: 1,
    noLink: true
  }

  dialog.showMessageBox(
    mainWindow,
    options
  ).then(
    handleNotificationButtonClick
  )
}

async function handleSuccess (
  response
) {
  const responseData =
    await response.json()

  latestRelease = responseData

  latestVersion = latestRelease.name

  const currentVersion = app.getVersion()

  const isNewVersionAvailable = (
    latestVersion >
      currentVersion
  )

  if (isNewVersionAvailable) {
    showNotification()
  }
}

function handleError () {
  setTimeout(
    checkForUpdates,
    2000
  )
}

export default function checkForUpdates () {
  if(isMac) {
    const releasesUrl =
      'https://api.github.com/repos/staniel359/muffon/releases/latest'

    net.fetch(
      releasesUrl
    ).then(
      handleSuccess
    ).catch(
      handleError
    )
  } else {
    autoUpdater.checkForUpdatesAndNotify()
  }
  
}
