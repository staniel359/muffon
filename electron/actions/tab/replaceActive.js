import findIndex from './findIndex'
import getTabs from '#/actions/tabs/get'
import setActive from './setActive'

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
