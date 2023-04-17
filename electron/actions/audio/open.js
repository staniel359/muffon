import getPath from './getPath'
import readFile from '#/actions/file/read'

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
