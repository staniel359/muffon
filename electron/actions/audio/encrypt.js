const open = require(
  './open'
)
const encryptFile = require(
  '../file/encrypt'
)
const create = require(
  './create'
)
const remove = require(
  './remove'
)

function encrypt (
  {
    tempFileName,
    fileName
  }
) {
  const file =
    open(
      tempFileName
    )

  const encryptedFileData =
    encryptFile(
      file
    )

  const {
    key,
    iv,
    encryptedFile
  } = encryptedFileData

  create(
    fileName,
    encryptedFile
  )

  remove(
    tempFileName
  )

  return {
    key,
    iv
  }
}

module.exports = encrypt
