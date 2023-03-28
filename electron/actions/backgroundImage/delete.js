import getPath from './getPath.js'
import deleteFile from '../file/delete.js'

export default function deleteBackgroundImage (
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

  deleteFile(
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
