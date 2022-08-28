const {
  appName
} = require(
  '../../utils'
)

function setTitle (
  value
) {
  mainWindow.setTitle(
    value || appName
  )
}

module.exports = setTitle
