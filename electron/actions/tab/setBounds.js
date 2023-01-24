const electronStore = require(
  '../../../shared/plugins/electronStore'
)

function setBounds (
  tab
) {
  const scale =
    electronStore.get(
      'layout.scale'
    )

  const topOffsetScaled =
    Math.round(
      topOffset * scale
    )

  const [
    width,
    height
  ] = mainWindow.getContentSize()

  const heightComputed = (
    height - tabsPanelHeight
  )

  const options = {
    x: 0,
    y: topOffsetScaled,
    width,
    height: heightComputed
  }

  tab.setBounds(
    options
  )
}

module.exports = setBounds
