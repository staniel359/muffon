export default function () {
  mainView
    .webContents
    .send(
      'quit'
    )
}
