export default function (
  tab,
  value
) {
  tab
    .webContents
    .setZoomFactor(
      value
    )
}
