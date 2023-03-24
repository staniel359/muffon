import get from './get.js'
import clearTab from '../tab/clear.js'

function getTabId (
  tabData
) {
  return tabData.uuid
}

export default function clear () {
  const tabIds =
    get().map(
      getTabId
    )

  tabIds.forEach(
    clearTab
  )
}
