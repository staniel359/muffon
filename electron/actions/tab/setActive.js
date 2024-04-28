import findTab from './find.js'
import hideInactiveTabs from '../tabs/hideInactive.js'

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
