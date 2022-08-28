const getPath = require(
  './getPath'
)
const fs = require(
  'fs'
)

function open (
  fileName
) {
  const filePath =
    getPath(
      fileName
    )

  return fs.readFileSync(
    filePath
  )
}

module.exports = open
