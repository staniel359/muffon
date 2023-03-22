const find = require(
  './find'
)

function clear (
  tabId
) {
  const tab =
    find(
      tabId
    )

  if (tab) {
    mainWindow.removeBrowserView(
      tab
    )

    tab
      .webContents
      .destroy()
  }
}

module.exports = clear
