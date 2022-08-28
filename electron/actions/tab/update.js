function update (
  data
) {
  mainWindow
    .webContents
    .send(
      'update-tab',
      data
    )
}

module.exports = update
