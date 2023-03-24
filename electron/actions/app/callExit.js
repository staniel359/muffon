export default function callExit () {
  mainWindow
    .webContents
    .send(
      'exit'
    )
}
