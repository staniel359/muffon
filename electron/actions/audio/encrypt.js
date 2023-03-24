import open from './open.js'
import encryptFile from '../file/encrypt.js'
import create from './create.js'
import remove from './remove.js'

export default function encrypt (
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
