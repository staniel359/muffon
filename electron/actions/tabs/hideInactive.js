import getTabs from './get'

export default function (
  {
    tabId
  }
) {
  function isMatchedTab (
    tab
  ) {
    return tab.uuid !== tabId
  }

  function hideTab (
    tab
  ) {
    tab.setVisible(
      false
    )
  }

  getTabs().filter(
    isMatchedTab
  ).forEach(
    hideTab
  )
}
