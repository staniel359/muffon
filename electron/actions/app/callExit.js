export default function () {
  mainWindow
    .webContents
    .send(
      'exit'
    )
}
