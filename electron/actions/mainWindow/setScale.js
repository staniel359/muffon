function setScale (
  value
) {
  mainWindow
    .webContents
    .setZoomFactor(
      value
    )
}

module.exports = setScale
