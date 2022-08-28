const getPath = require(
  './getPath'
)
const fs = require(
  'fs'
)

function create (
  fileName,
  data
) {
  const filePath =
    getPath(
      fileName
    )

  fs.writeFileSync(
    filePath,
    data
  )
}

module.exports = create
