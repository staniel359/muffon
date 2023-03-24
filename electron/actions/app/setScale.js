import setMainWindowScale from '../mainWindow/setScale.js'
import setTabsScale from '../tabs/setScale.js'

export default function setScale (
  value
) {
  setMainWindowScale(
    value
  )

  setTabsScale(
    value
  )
}
