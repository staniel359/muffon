const get = require(
  './get'
)
const clearTab = require(
  '../tab/clear'
)

function getTabId (
  tabData
) {
  return tabData.uuid
}

function clear () {
  const tabIds =
    get().map(
      getTabId
    )

  tabIds.forEach(
    clearTab
  )
}

module.exports = clear
