import clearTab from './clear'

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
