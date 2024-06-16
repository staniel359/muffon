import setViewsDarkMode from '../actions/views/setDarkMode.js'
import setViewsScale from '../actions/views/setScale.js'

export function handleIsDarkModeChange () {
  setViewsDarkMode()
}

export function handleScaleChange () {
  setViewsScale()
}
