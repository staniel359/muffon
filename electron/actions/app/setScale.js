import setMainWindowScale from '#/actions/mainWindow/setScale'
import setTabsScale from '#/actions/tabs/setScale'

export default function (
  value
) {
  setMainWindowScale(
    value
  )

  setTabsScale(
    value
  )
}
