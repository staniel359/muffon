import createTab from '../../actions/tab/create.js'
import setActiveTab from '../../actions/tab/setActive.js'
import updateTab from '../../actions/tab/update.js'
import isReplaceActiveTab from '../../actions/tab/isReplaceActive.js'
import replaceActiveTab from '../../actions/tab/replaceActive.js'
import deleteTab from '../../actions/tab/delete.js'

export function handleAddTab (
  _,
  data
) {
  const dataFormatted =
    JSON.parse(
      data
    )

  createTab(
    dataFormatted
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

export function handleDeleteTab (
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

  deleteTab(
    tabId
  )
}
