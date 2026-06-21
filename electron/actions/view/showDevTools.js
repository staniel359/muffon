export default function (
  view,
  {
    mode
  }
) {
  const options = {
    mode
  }

  view
    .webContents
    .openDevTools(
      options
    )
}
