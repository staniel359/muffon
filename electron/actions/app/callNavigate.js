export default function callNavigate (
  data
) {
  mainWindow
    .webContents
    .send(
      'navigate',
      data
    )
}
