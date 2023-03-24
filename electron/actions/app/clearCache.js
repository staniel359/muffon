export default function clearCache () {
  return mainWindow
    .webContents
    .session
    .clearCache()
}
