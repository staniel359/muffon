export default function (
  data
) {
  mainWindow
    .webContents
    .send(
      'navigate',
      data
    )
}
