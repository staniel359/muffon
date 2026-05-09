import findTab from './find.js'
import hideInactiveTabs from '../tabs/hideInactive.js'
import setViewScale from '../view/setScale.js'

export default function (
  tabId
) {
  const tab =
    findTab(
      tabId
    )

  if (!tab) { return }

  tab.setVisible(
    true
  )

  tab
    .webContents
    .focus()

  setViewScale(
    tab
  )

  hideInactiveTabs(
    {
      tabId
    }
  )

  mainView
    .webContents
    .send(
      'set-active-tab',
      tabId
    )
}
