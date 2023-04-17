import find from './find'

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
