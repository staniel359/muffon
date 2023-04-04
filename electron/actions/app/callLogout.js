export default function () {
  mainWindow
    .webContents
    .send(
      'logout'
    )
}
