import getTabs from '../tabs/get.js'

export default function findIndex (
  tabId
) {
  function isMatchedTab (
    tabData
  ) {
    return (
      tabData.uuid === tabId
    )
  }

  return getTabs().findIndex(
    isMatchedTab
  )
}
