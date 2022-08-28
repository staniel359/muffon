const path = require(
  'path'
)
const {
  backgroundImagesFolderPath
} = require(
  '../../paths'
)

function getPath (
  fileName
) {
  return path.join(
    backgroundImagesFolderPath,
    fileName
  )
}

module.exports = getPath
