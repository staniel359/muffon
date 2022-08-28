const {
  app
} = require(
  'electron'
)
const setup = require(
  './setup'
)
const {
  appName
} = require(
  '../../utils'
)

function initialize () {
  app
    .whenReady()
    .then(
      setup
    )

  app.setAppUserModelId(
    appName
  )
}

module.exports = initialize
