export default function () {
  mainView
    .webContents
    .send(
      'account-delete'
    )
}
