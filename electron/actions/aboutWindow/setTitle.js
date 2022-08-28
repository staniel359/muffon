const i18n = require(
  'i18n'
)

function setTitle () {
  const title =
    i18n.__(
      'about'
    )

  aboutWindow.setTitle(
    title
  )
}

module.exports = setTitle
