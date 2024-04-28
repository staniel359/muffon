import getBackgroundImagePath from './getPath'
import deleteFile from '#/actions/file/delete'

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
