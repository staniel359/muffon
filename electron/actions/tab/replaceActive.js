const findIndex = require(
  './findIndex'
)
const getTabs = require(
  '../tabs/get'
)
const setActive = require(
  './setActive'
)

function replaceActive (
  tabId
) {
  const tabIndex =
    findIndex(
      tabId
    )

  const newActiveTabIndex =
    tabIndex ? (tabIndex - 1) : 1

  const newActiveTabId =
    getTabs()[
      newActiveTabIndex
    ].uuid

  setActive(
    newActiveTabId
  )
}

module.exports = replaceActive
