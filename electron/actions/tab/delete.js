import clearTab from './clear.js'

export default function (
  tabId
) {
  clearTab(
    tabId
  )

  mainView
    .webContents
    .send(
      'delete-tab',
      tabId
    )
}
