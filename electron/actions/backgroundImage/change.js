const path = require(
  'path'
)
const {
  backgroundImagesFolderPath
} = require(
  '../../paths'
)
const fs = require(
  'fs'
)
const {
  download
} = require(
  'electron-dl'
)
const getPath = require(
  './getPath'
)

let fileId
let fileName
let fileUrl
let filePath

function handleSuccess () {
  const data = {
    imageId: fileId,
    imagePath: filePath
  }

  mainWindow
    .webContents
    .send(
      'change-background-image',
      data
    )
}

function downloadImage () {
  const options = {
    directory:
      backgroundImagesFolderPath,
    filename: fileName
  }

  download(
    mainWindow,
    fileUrl,
    options
  ).then(
    handleSuccess
  )
}

function change (
  {
    imageId,
    imageUrl
  }
) {
  fileId = imageId

  fileName = fileId.toString()

  fileUrl = imageUrl

  filePath =
    getPath(
      fileName
    )

  const isFileExist =
    fs.existsSync(
      filePath
    )

  if (isFileExist) {
    handleSuccess()
  } else {
    downloadImage()
  }
}

module.exports = change
