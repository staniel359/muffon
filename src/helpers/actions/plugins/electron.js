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
const {
  appLanguage
} = require(
  '../../actions/plugins/electronStore'
)
const {
  i18n
} = require(
  '../../data/plugins/electron'
)

let contextWindow
let latestRelease
let latestVersion

function checkForUpdates (
  {
    mainWindow
  }
) {
  contextWindow = mainWindow

  const releasesUrl =
    'https://api.github.com/repos/staniel359/muffon/releases'

  axios.get(
    releasesUrl
  ).then(
    handleSuccess
  )
}

function handleSuccess (
  response
) {
  latestRelease = response.data[0]
  latestVersion = latestRelease.name

  const currentVersion =
    app.getVersion()

  const isNewVersionAvailable = (
    latestVersion !==
      currentVersion
  )

  if (isNewVersionAvailable) {
    showNotification()
  }
}

function showNotification () {
  const localeData =
    i18n[appLanguage].update

  const options = {
    type: 'info',
    message: localeData.message(
      latestVersion
    ),
    buttons: [
      localeData.buttons.download,
      localeData.buttons.close
    ],
    defaultId: 0,
    cancelId: 1
  }

  dialog.showMessageBox(
    contextWindow,
    options
  ).then(
    handleDialogButtonClick
  )
}

function handleDialogButtonClick (
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

module.exports = {
  checkForUpdates
}
