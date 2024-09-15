import getTabs from '../tabs/get.js'

export default function () {
  const tabs = getTabs()

  const lastTabIndex = (
    tabs.length - 1
  )

  return tabs[lastTabIndex]
}
