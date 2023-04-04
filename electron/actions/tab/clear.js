import find from './find.js'

export default function (
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
