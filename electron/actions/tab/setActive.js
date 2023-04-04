import find from './find.js'

export default function (
  tabId
) {
  const tab =
    find(
      tabId
    )

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
