function callExit () {
  mainWindow
    .webContents
    .send(
      'exit'
    )
}

module.exports = callExit
