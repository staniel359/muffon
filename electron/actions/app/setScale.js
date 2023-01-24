const getTabs = require(
  '../tabs/get'
)
const setTabBounds = require(
  '../tab/setBounds'
)

function setScale (
  value
) {
  mainWindow
    .webContents
    .setZoomFactor(
      value
    )

  getTabs().forEach(
    setTabBounds
  )
}

module.exports = setScale
