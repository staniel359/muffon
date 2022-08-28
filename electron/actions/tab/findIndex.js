const getTabs = require(
  '../tabs/get'
)

function findIndex (
  tabId
) {
  function isMatchedTab (
    tabData
  ) {
    return tabData.uuid === tabId
  }

  return getTabs().findIndex(
    isMatchedTab
  )
}

module.exports = findIndex
