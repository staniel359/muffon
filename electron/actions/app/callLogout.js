export default function () {
  mainView
    .webContents
    .send(
      'logout'
    )
}
