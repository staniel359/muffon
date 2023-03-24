import getTabs from '../tabs/get.js'
import getActiveId from './getActiveId.js'

export default function isReplaceActive (
  tabId
) {
  const isMultipleTabs =
    getTabs().length > 1

  const isActive = (
    tabId === getActiveId()
  )

  return (
    isMultipleTabs &&
      isActive
  )
}
