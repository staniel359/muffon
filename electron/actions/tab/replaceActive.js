import findTabIndex from './findIndex.js'
import getTabs from '../tabs/get.js'
import setActiveTab from './setActive.js'

export default function (
  tabId
) {
  const tabIndex =
    findTabIndex(
      tabId
    )

  const newActiveTabIndex =
    tabIndex ? (tabIndex - 1) : 1

  const newActiveTabId =
    getTabs()[
      newActiveTabIndex
    ].uuid

  setActiveTab(
    newActiveTabId
  )
}
