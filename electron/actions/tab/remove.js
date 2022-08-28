const clear = require(
  './clear'
)

function remove (
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

module.exports = remove
