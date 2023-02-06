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
const setAudioFlags = require(
  './setAudioFlags'
)

function preinitialize () {
  setupDotenv()

  if (isDevelopment) {
    setDevelopmentUserDataPath()
  }

  setAudioFlags()
}

module.exports = preinitialize
