const setTrayTooltip = require(
  '../../actions/tray/setTooltip'
)

function handleSetTrayTooltip (
  _,
  value
) {
  setTrayTooltip(
    value
  )
}

module.exports = {
  handleSetTrayTooltip
}
