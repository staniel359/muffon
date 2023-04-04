export default function () {
  mainWindow
    .webContents
    .send(
      'reset-background-image'
    )
}
