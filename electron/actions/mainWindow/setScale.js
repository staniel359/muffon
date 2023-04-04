export default function (
  value
) {
  mainWindow
    .webContents
    .setZoomFactor(
      value
    )
}
