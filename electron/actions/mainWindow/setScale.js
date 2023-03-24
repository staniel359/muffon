export default function setScale (
  value
) {
  mainWindow
    .webContents
    .setZoomFactor(
      value
    )
}
