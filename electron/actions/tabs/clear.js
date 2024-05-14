import getTabs from './get.js'
import clearTab from '../tab/clear.js'

function getTabId (
  tabData
) {
  return tabData.uuid
}

export default function () {
  const tabIds =
    getTabs().map(
      getTabId
    )

  tabIds.forEach(
    clearTab
  )
}
