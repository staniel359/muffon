const setupDotenv = require(
  './electron/actions/dotenv/setup'
)

setupDotenv()

const {
  isDevelopment
} = require(
  './electron/utils'
)
const setDevelopmentUserDataPath = require(
  './electron/actions/app/setDevelopmentUserDataPath'
)

if (isDevelopment) {
  setDevelopmentUserDataPath()
}

const globalVariables = require(
  './electron/globalVariables'
)
const events = require(
  './electron/events'
)
const initialize = require(
  './electron/actions/app/initialize'
)

globalVariables

events

initialize()
