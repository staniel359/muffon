const setupDotenv = require(
  '../dotenv/setup'
)
const {
  isDevelopment
} = require(
  '../../utils'
)
const setDevelopmentUserDataPath = require(
  './setDevelopmentUserDataPath'
)

function preinitialize () {
  setupDotenv()

  if (isDevelopment) {
    setDevelopmentUserDataPath()
  }
}

module.exports = preinitialize
