import findTab from './find.js'

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
