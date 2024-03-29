import get from './get'
import clearTab from '#/actions/tab/clear'

function getTabId (
  tabData
) {
  return tabData.uuid
}

export default function () {
  const tabIds =
    get().map(
      getTabId
    )

  tabIds.forEach(
    clearTab
  )
}
