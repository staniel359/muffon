import find from './find'

export default function (
  tabId
) {
  const tab =
    find(
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
