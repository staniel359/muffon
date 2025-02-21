import setViewScale from '../view/setScale.js'
import setTabsScale from '../tabs/setScale.js'

export default function () {
  setViewScale(
    mainWindow
  )

  setViewScale(
    aboutWindow
  )

  setTabsScale()
}
