import getTabs from '../actions/tabs/get'
import changeViewBackgroundColor
  from '../actions/view/changeBackgroundColor'

export function handleIsDarkModeChange () {
  const views = [
    mainWindow,
    mainView,
    aboutWindow,
    aboutView,
    ...getTabs(),
  ]

  views.forEach(
    changeViewBackgroundColor
  )
}
