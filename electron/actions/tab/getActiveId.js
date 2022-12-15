const electronStore = require(
  '../../../shared/plugins/electronStore'
)

function getActiveId () {
  return electronStore.get(
    'layout.activeTabId'
  )
}

module.exports = getActiveId
