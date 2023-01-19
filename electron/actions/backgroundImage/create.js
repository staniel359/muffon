const {
  generateKey
} = require(
  '../../../shared/helpers/utils'
)
const getPath = require(
  './getPath'
)
const fs = require(
  'fs'
)
const findTab = require(
  '../tab/find'
)

function create (
  {
    tabId,
    imageData
  }
) {
  const isImage =
    imageData.includes(
      'data:image'
    )

  const fileName = generateKey()

  const filePath =
    getPath(
      fileName
    )

  function handleComplete (
    error
  ) {
    if (!error) {
      const tab =
        findTab(
          tabId
        )

      const data = {
        id: fileName,
        path: filePath
      }

      tab
        .webContents
        .send(
          'create-background-image',
          data
        )
    }
  }

  if (isImage) {
    const imageDataFormatted =
      imageData.replace(
        /data:image\/(.+);base64,/,
        ''
      )

    const buffer =
      Buffer.from(
        imageDataFormatted,
        'base64'
      )

    fs.writeFile(
      filePath,
      buffer,
      handleComplete
    )
  }
}

module.exports = create
