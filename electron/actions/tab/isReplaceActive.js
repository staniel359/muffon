import getTabs from '#/actions/tabs/get'
import getActiveId from './getActiveId'

export default function (
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
