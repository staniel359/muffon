import clear from './clear.js'

export default function deleteTab (
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
