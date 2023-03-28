import getPath from './getPath.js'
import deleteFile from '../file/delete.js'

export default function deleteAudio (
  fileName
) {
  const filePath =
    getPath(
      fileName
    )

  deleteFile(
    filePath
  )
}
