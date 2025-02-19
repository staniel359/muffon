export default function () {
  return mainView
    .webContents
    .session
    .clearCache()
}
