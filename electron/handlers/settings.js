import setViewsDarkMode from '../actions/views/setDarkMode.js'
import setViewsScale from '../actions/views/setScale.js'
import setWindowsScale from '../actions/windows/setScale.js'

export function handleIsDarkModeChange () {
  setViewsDarkMode()
}

export function handleScaleChange () {
  setWindowsScale()

  setViewsScale()
}
