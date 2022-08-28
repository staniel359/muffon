function callLogout () {
  mainWindow
    .webContents
    .send(
      'logout'
    )
}

module.exports = callLogout
