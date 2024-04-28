import clearTab from './clear'

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
