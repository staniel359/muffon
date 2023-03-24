export default function callNavigate (
  value
) {
  mainWindow
    .webContents
    .send(
      'navigate',
      value
    )
}
