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

  mainView
    .webContents
    .send(
      'change-background-image',
      data
    )
}
