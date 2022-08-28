const getTabs = require(
  '../tabs/get'
)
const getActiveId = require(
  './getActiveId'
)

function isReplaceActive (
  tabId
) {
  const isMultipleTabs =
    getTabs().length > 1

  const isActive = (
    tabId === getActiveId()
  )

  return (
    isMultipleTabs &&
      isActive
  )
}

module.exports = isReplaceActive
