const getTabs = require(
  '../tabs/get'
)

function find (
  tabId
) {
  function isMatchedTab (
    tabData
  ) {
    return tabData.uuid === tabId
  }

  return getTabs().find(
    isMatchedTab
  )
}

module.exports = find
