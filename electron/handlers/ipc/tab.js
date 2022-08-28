const createTab = require(
  '../../actions/tab/create'
)
const setActiveTab = require(
  '../../actions/tab/setActive'
)
const updateTab = require(
  '../../actions/tab/update'
)
const isReplaceActiveTab = require(
  '../../actions/tab/isReplaceActive'
)
const replaceActiveTab = require(
  '../../actions/tab/replaceActive'
)
const removeTab = require(
  '../../actions/tab/remove'
)

function handleAddTab (
  _,
  data
) {
  createTab(
    data
  )
}

function handleSetActiveTab (
  _,
  tabId
) {
  setActiveTab(
    tabId
  )
}

function handleUpdateTab (
  _,
  data
) {
  updateTab(
    data
  )
}

function handleRemoveTab (
  _,
  tabId
) {
  const isReplace =
    isReplaceActiveTab(
      tabId
    )

  if (isReplace) {
    replaceActiveTab(
      tabId
    )
  }

  removeTab(
    tabId
  )
}

module.exports = {
  handleAddTab,
  handleSetActiveTab,
  handleUpdateTab,
  handleRemoveTab
}
