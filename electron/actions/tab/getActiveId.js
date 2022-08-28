const electronStore = require(
  '../../electronStore'
)

function getActiveId () {
  return electronStore.get(
    'layout.activeTabId'
  )
}

module.exports = getActiveId
