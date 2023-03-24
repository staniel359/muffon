export default function setScale (
  tab,
  value
) {
  tab
    .webContents
    .setZoomFactor(
      value
    )
}
