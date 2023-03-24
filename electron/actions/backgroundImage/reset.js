export default function reset () {
  mainWindow
    .webContents
    .send(
      'reset-background-image'
    )
}
