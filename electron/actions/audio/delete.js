import getPath from './getPath.js'
import deleteFile from '../file/delete.js'

export default function (
  fileName
) {
  const filePath =
    getPath(
      fileName
    )

  return deleteFile(
    filePath
  )
}
