export default function (
  data
) {
  mainView
    .webContents
    .send(
      'update-tab',
      data
    )
}
