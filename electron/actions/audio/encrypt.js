import open from './open.js'
import encryptFile from '../file/encrypt.js'
import create from './create.js'
import deleteAudio from './delete.js'

export default function (
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

  deleteAudio(
    tempFileName
  )

  return {
    key,
    iv
  }
}
