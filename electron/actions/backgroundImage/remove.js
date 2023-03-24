import getPath from './getPath.js'
import removeFile from '../file/remove.js'

export default function remove (
  {
    imageId
  }
) {
  const fileName =
    imageId.toString()

  const filePath =
    getPath(
      fileName
    )

  removeFile(
    filePath
  )

  const data = {
    imageId
  }

  mainWindow
    .webContents
    .send(
      'delete-background-image',
      data
    )
}
