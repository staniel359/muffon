const {
  isMac
} = require(
  '../../utils'
)

function setTopOffset () {
  const isFullScreen =
    mainWindow.isFullScreen()

  const titleBarHeight =
    (isMac && !isFullScreen) ? 28 : 0

  topOffset = (
    titleBarHeight +
      tabsPanelHeight
  )
}

module.exports = setTopOffset
