export default function () {
  mainView
    .webContents
    .send(
      'exit'
    )
}
