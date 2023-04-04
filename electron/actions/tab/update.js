export default function (
  data
) {
  mainWindow
    .webContents
    .send(
      'update-tab',
      data
    )
}
