const i18n = require(
  'i18n'
)
const setTrayMenu = require(
  '../tray/setMenu'
)
const setAboutWindowTitle = require(
  '../aboutWindow/setTitle'
)

function setLanguage (
  value
) {
  i18n.setLocale(
    value
  )

  setTrayMenu()

  setAboutWindowTitle()
}

module.exports = setLanguage
