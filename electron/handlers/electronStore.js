import getTabs from '../actions/tabs/get'
import changeViewBackgroundColor
  from '../actions/view/changeBackgroundColor'

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
