const {
  app
} = require(
  'electron'
)
const path = require(
  'path'
)

const productionPath =
  path.join(
    __dirname,
    '..',
    'index.html'
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

const backgroundImagesFolderPath =
  path.join(
    userDataPath,
    'background_images'
  )

module.exports = {
  productionPath,
  audioFolderPath,
  backgroundImagesFolderPath
}
