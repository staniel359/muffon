export default function () {
  mainWindow
    .webContents
    .send(
      'quit'
    )
}
