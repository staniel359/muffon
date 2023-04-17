import getPath from './getPath'
import deleteFile from '#/actions/file/delete'

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
