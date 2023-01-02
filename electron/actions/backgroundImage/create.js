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
    data
  }
) {
  const isImage =
    data.includes(
      'data:image'
    )

  if (isImage) {
    const fileName = generateKey()

    const filePath =
      getPath(
        fileName
      )

    const dataFormatted =
      data.replace(
        /data:image\/(.+);base64,/,
        ''
      )

    const buffer =
      Buffer.from(
        dataFormatted,
        'base64'
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

    fs.writeFile(
      filePath,
      buffer,
      handleComplete
    )
  }
}

module.exports = create
