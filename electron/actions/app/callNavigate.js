export default function (
  data
) {
  mainView
    .webContents
    .send(
      'navigate',
      data
    )
}
