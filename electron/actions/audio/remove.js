const getPath = require(
  './getPath'
)
const removeFile = require(
  '../file/remove'
)

function remove (
  fileName
) {
  const filePath =
    getPath(
      fileName
    )

  removeFile(
    filePath
  )
}

module.exports = remove
