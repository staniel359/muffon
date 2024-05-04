import findTab from './find'

export default function (
  tabId
) {
  const tab =
    findTab(
      tabId
    )

  if (!tab) { return }

  mainWindow.setTopBrowserView(
    tab
  )

  mainWindow
    .webContents
    .send(
      'set-active-tab',
      tabId
    )
}
