import getPath from './getPath.js'
import removeFile from '../file/remove.js'

export default function remove (
  fileName
) {
  const filePath =
    getPath(
      fileName
    )

  removeFile(
    filePath
  )
}
