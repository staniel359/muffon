import getAudioFilePath from './getPath'
import deleteFile from '#/actions/file/delete'

export default function (
  fileName
) {
  const filePath =
    getAudioFilePath(
      fileName
    )

  return deleteFile(
    filePath
  )
}
