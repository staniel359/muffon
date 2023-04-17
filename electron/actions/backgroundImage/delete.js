import getPath from './getPath'
import deleteFile from '#/actions/file/delete'

export default function (
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
