export default function callAccountDelete () {
  mainWindow
    .webContents
    .send(
      'account-delete'
    )
}
