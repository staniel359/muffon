const {
  appName
} = require(
  '../../utils'
)

function setTooltip (
  value
) {
  tray.setToolTip(
    value || appName
  )
}

module.exports = setTooltip
