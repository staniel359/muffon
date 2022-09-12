const {
  app,
  dialog,
  shell
} = require(
  'electron'
)
const axios = require(
  'axios'
)
const i18n = require(
  'i18n'
)

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
  const message = i18n.__(
    'electron.update.message',
    {
      version: latestVersion
    }
  )

  const buttons = [
    i18n.__(
      'electron.update.buttons.download'
    ),
    i18n.__(
      'electron.update.buttons.close'
    )
  ]

  const options = {
    type: 'info',
    message,
    buttons,
    defaultId: 0,
    cancelId: 1
  }

  dialog.showMessageBox(
    mainWindow,
    options
  ).then(
    handleNotificationButtonClick
  )
}

function handleSuccess (
  response
) {
  latestRelease = response.data[0]
  latestVersion = latestRelease.name

  const currentVersion = app.getVersion()

  const isNewVersionAvailable = (
    latestVersion !==
      currentVersion
  )

  if (isNewVersionAvailable) {
    showNotification()
  }
}

function checkForUpdates () {
  const releasesUrl =
    'https://api.github.com/repos/staniel359/muffon/releases'

  axios.get(
    releasesUrl
  ).then(
    handleSuccess
  )
}

module.exports = checkForUpdates
