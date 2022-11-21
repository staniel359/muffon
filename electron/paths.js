const {
  app
} = require(
  'electron'
)
const path = require(
  'path'
)
const {
  createFolderIfNotExists
} = require(
  './utils'
)

const productionPath =
  path.join(
    __dirname,
    '../index.html'
  )

const userDataPath =
  app.getPath(
    'userData'
  )

const audioFolderPath =
  path.join(
    userDataPath,
    'audio'
  )

createFolderIfNotExists(
  audioFolderPath
)

const backgroundImagesFolderPath =
  path.join(
    userDataPath,
    'background_images'
  )

createFolderIfNotExists(
  backgroundImagesFolderPath
)

module.exports = {
  productionPath,
  audioFolderPath,
  backgroundImagesFolderPath
}
