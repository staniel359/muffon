import {
  app,
  dialog,
  shell,
  net
} from 'electron'
import electronUpdater from 'electron-updater'
import {
  isMac
} from '../../helpers/utils.js'
import {
  releasesUrl
} from '../../helpers/urls.js'
import i18n from 'i18n'

const {
  autoUpdater
} = electronUpdater

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

function checkWithoutUpdate () {
  net.fetch(
    releasesUrl
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}

function checkWithUpdate () {
  autoUpdater
    .checkForUpdatesAndNotify()
}

export default function checkForUpdates () {
  if (isMac) {
    checkWithoutUpdate()
  } else {
    checkWithUpdate()
  }
}
