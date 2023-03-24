import find from './find.js'

export default function setActive (
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
