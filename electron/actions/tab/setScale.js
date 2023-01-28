function setScale (
  tab,
  value
) {
  tab
    .webContents
    .setZoomFactor(
      value
    )
}

module.exports = setScale
