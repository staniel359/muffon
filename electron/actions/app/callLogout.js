export default function callLogout () {
  mainWindow
    .webContents
    .send(
      'logout'
    )
}
