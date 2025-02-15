export default function () {
  mainView
    .webContents
    .send(
      'reset-background-image'
    )
}
