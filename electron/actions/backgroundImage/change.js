function change (
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

module.exports = change
