import findIndex from './findIndex.js'
import getTabs from '../tabs/get.js'
import setActive from './setActive.js'

export default function (
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
