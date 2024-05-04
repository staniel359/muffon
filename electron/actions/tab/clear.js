import findTab from './find'

export default function (
  tabId
) {
  const tab =
    findTab(
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
