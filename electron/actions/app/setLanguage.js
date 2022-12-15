const i18n = require(
  '../../../shared/plugins/i18n'
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
  i18n.global.locale = value

  setTrayMenu()

  setAboutWindowTitle()
}

module.exports = setLanguage
