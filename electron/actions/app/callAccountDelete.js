function callAccountDelete () {
  mainWindow
    .webContents
    .send(
      'account-delete'
    )
}

module.exports = callAccountDelete
