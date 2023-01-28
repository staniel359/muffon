const setMainWindowScale = require(
  '../mainWindow/setScale'
)
const setTabsScale = require(
  '../tabs/setScale'
)

function setScale (
  value
) {
  setMainWindowScale(
    value
  )

  setTabsScale(
    value
  )
}

module.exports = setScale
