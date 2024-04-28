import findTab from './find'
import hideInactiveTabs from '../tabs/hideInactive'

export default function (
  tabId
) {
  const tab =
    findTab(
      tabId
    )

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
