export default function update (
  data
) {
  mainWindow
    .webContents
    .send(
      'update-tab',
      data
    )
}
