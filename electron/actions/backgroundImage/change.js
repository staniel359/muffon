export default function (
  {
    imageId,
    imagePath
  }
) {
  const data = {
    imageId,
    imagePath
  }

  mainWindow
    .webContents
    .send(
      'change-background-image',
      data
    )
}
