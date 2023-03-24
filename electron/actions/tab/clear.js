import find from './find.js'

export default function clear (
  tabId
) {
  const tab =
    find(
      tabId
    )

  if (tab) {
    mainWindow.removeBrowserView(
      tab
    )

    tab
      .webContents
      .destroy()
  }
}
