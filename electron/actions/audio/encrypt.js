import open from './open'
import encryptFile from '#/actions/file/encrypt'
import create from './create'
import deleteAudio from './delete'

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
