function reset () {
  mainWindow
    .webContents
    .send(
      'reset-background-image'
    )
}

module.exports = reset
