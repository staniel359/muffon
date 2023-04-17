import getTabs from '#/actions/tabs/get'

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

  return getTabs().findIndex(
    isMatchedTab
  )
}
