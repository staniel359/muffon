const path = require(
  'path'
)
const {
  app
} = require(
  'electron'
)

function setDevelopmentUserDataPath () {
  const developmentUserDataPath =
    path.join(
      __dirname,
      '../../../electron_data'
    )

  app.setPath(
    'userData',
    developmentUserDataPath
  )
}

module.exports = setDevelopmentUserDataPath
