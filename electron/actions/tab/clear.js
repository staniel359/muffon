const find = require(
  './find'
)
const {
  isDevelopment
} = require(
  '../../utils'
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

    if (isDevelopment) {
      tab
        .webContents
        .closeDevTools()
    }

    tab
      .webContents
      .destroy()
  }
}

module.exports = clear
