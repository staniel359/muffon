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
const setFlags = require(
  './setFlags'
)

function preinitialize () {
  setupDotenv()

  if (isDevelopment) {
    setDevelopmentUserDataPath()
  }

  setFlags()
}

module.exports = preinitialize
