const fs = require(
  'fs'
)

function remove (
  filePath
) {
  fs.unlinkSync(
    filePath,
    () => true
  )
}

module.exports = remove
