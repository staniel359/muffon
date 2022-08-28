const find = require(
  './find'
)

function setActive (
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

module.exports = setActive
