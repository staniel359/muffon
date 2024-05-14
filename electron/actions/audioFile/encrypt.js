import openAudioFile from './open.js'
import encryptFile from '../file/encrypt.js'
import createAudioFile from './create.js'
import deleteAudioFile from './delete.js'

export default function (
  {
    tempFileName,
    fileName
  }
) {
  const file =
    openAudioFile(
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

  createAudioFile(
    fileName,
    encryptedFile
  )

  deleteAudioFile(
    tempFileName
  )

  return {
    key,
    iv
  }
}
