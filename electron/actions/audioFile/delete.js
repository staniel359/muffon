import getAudioFilePath from './getPath.js'
import deleteFile from '../file/delete.js'

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
