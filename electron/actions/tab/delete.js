import clear from './clear'

export default function (
  tabId
) {
  clear(
    tabId
  )

  mainWindow
    .webContents
    .send(
      'delete-tab',
      tabId
    )
}
