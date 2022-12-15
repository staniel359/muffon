const i18n = require(
  '../../../shared/plugins/i18n'
)

function setTitle () {
  const title =
    i18n.global.t(
      'electron.about'
    )

  aboutWindow.setTitle(
    title
  )
}

module.exports = setTitle
