export default function () {
  return mainWindow
    .webContents
    .session
    .clearCache()
}
