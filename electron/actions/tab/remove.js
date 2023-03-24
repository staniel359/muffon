import clear from './clear.js'

export default function remove (
  tabId
) {
  clear(
    tabId
  )

  mainWindow
    .webContents
    .send(
      'remove-tab',
      tabId
    )
}
