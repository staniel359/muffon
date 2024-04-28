import openAudioFile from './open'
import encryptFile from '#/actions/file/encrypt'
import createAudioFile from './create'
import deleteAudioFile from './delete'

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
