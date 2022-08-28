const getPath = require(
  './getPath'
)
const removeFile = require(
  '../file/remove'
)

function remove (
  {
    imageId
  }
) {
  const fileName = imageId.toString()

  const filePath =
    getPath(
      fileName
    )

  removeFile(
    filePath
  )

  const data = {
    imageId
  }

  mainWindow
    .webContents
    .send(
      'delete-background-image',
      data
    )
}

module.exports = remove
