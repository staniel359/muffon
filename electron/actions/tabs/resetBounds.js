const getTabs = require(
  './get'
)
const resetTabBounds = require(
  '../tab/resetBounds'
)

function resetBounds (
  value
) {
  getTabs().forEach(
    resetTabBounds
  )
}

module.exports = resetBounds
