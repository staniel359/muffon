import createTab from '../../actions/tab/create.js'
import setActiveTab from '../../actions/tab/setActive.js'
import updateTab from '../../actions/tab/update.js'
import isReplaceActiveTab from '../../actions/tab/isReplaceActive.js'
import replaceActiveTab from '../../actions/tab/replaceActive.js'
import removeTab from '../../actions/tab/remove.js'

export function handleAddTab (
  _,
  data
) {
  createTab(
    data
  )
}

export function handleSetActiveTab (
  _,
  tabId
) {
  setActiveTab(
    tabId
  )
}

export function handleUpdateTab (
  _,
  data
) {
  updateTab(
    data
  )
}

export function handleRemoveTab (
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
