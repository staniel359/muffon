import electronStore from '../plugins/electronStore.js'
import {
  handleIsDarkModeChange
} from '../handlers/electronStore.js'

export default function () {
  electronStore.onDidChange(
    'layout.isDarkMode',
    handleIsDarkModeChange
  )
}
