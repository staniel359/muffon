import findTabIndex from './findIndex'
import getTabs from '#/actions/tabs/get'
import setActiveTab from './setActive'

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
