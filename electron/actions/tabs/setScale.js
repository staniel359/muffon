const getTabs = require(
  './get'
)
const setTabBounds = require(
  '../tab/setBounds'
)
const setTabScale = require(
  '../tab/setScale'
)

function setScale (
  value
) {
  function setTabBoundsAndScale (
    tab
  ) {
    setTabBounds(
      tab
    )

    setTabScale(
      tab,
      value
    )
  }

  getTabs().forEach(
    setTabBoundsAndScale
  )
}

module.exports = setScale
