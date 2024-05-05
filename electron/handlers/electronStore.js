import getTabs from '../actions/tabs/get.js'
import changeViewBackgroundColor
  from '../actions/view/changeBackgroundColor.js'

export function handleIsDarkModeChange () {
  const views = [
    mainWindow,
    aboutWindow,
    ...getTabs(),
  ]

  views.forEach(
    changeViewBackgroundColor
  )
}
