import getBackgroundImagePath from './getPath.js'
import deleteFile from '../file/delete.js'

export default function (
  {
    imageId
  }
) {
  const fileName =
    imageId.toString()

  const filePath =
    getBackgroundImagePath(
      fileName
    )

  deleteFile(
    filePath
  )

  const data = {
    imageId
  }

  mainView
    .webContents
    .send(
      'delete-background-image',
      data
    )
}
