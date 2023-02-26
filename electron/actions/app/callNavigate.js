function callNavigate (
  value
) {
  mainWindow
    .webContents
    .send(
      'navigate',
      value
    )
}

module.exports = callNavigate
