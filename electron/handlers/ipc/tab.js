import createTab from '#/actions/tab/create'
import setActiveTab from '#/actions/tab/setActive'
import updateTab from '#/actions/tab/update'
import isReplaceActiveTab from '#/actions/tab/isReplaceActive'
import replaceActiveTab from '#/actions/tab/replaceActive'
import deleteTab from '#/actions/tab/delete'

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
