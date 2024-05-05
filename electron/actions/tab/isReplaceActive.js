import getTabs from '../tabs/get.js'
import getActiveTabId from './getActiveId.js'

export default function (
  tabId
) {
  const isMultipleTabs =
    getTabs().length > 1

  const isActive = (
    tabId === getActiveTabId()
  )

  return (
    isMultipleTabs &&
      isActive
  )
}
