import getPath from './getPath.js'
import readFile from '../file/read.js'

export default function (
  fileName
) {
  const filePath =
    getPath(
      fileName
    )

  return readFile(
    filePath
  )
}
