import getTabs from '../tabs/get.js'

export default function (
  tabId
) {
  function isMatchedTab (
    tabData
  ) {
    return (
      tabData.uuid === tabId
    )
  }

  return getTabs().find(
    isMatchedTab
  )
}
