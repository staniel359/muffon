const getTabs = require(
  './get'
)
const setTabBounds = require(
  '../tab/setBounds'
)

function setBounds (
  value
) {
  getTabs().forEach(
    setTabBounds
  )
}

module.exports = setBounds
