const path = require(
  'path'
)
const {
  audioFolderPath
} = require(
  '../../paths'
)

function getPath (
  fileName
) {
  return path.join(
    audioFolderPath,
    fileName
  )
}

module.exports = getPath
