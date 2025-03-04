import electronStore from '../plugins/electronStore.js'
import {
  handleIsDarkModeChange,
  handleScaleChange
} from '../handlers/settings.js'

export default function () {
  electronStore.onDidChange(
    'layout.isDarkMode',
    handleIsDarkModeChange
  )

  electronStore.onDidChange(
    'layout.scale',
    handleScaleChange
  )
}
