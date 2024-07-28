import setViewScale from '../view/setScale.js'
import setTabsScale from '../tabs/setScale.js'

export default function (
  value
) {
  setViewScale(
    mainWindow
  )

  setViewScale(
    aboutWindow
  )

  setTabsScale()
}
