export default function () {
  mainWindow
    .webContents
    .send(
      'account-delete'
    )
}
