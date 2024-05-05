import clearTab from './clear.js'

export default function (
  tabId
) {
  clearTab(
    tabId
  )

  mainWindow
    .webContents
    .send(
      'delete-tab',
      tabId
    )
}
