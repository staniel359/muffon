import electronStore from '../plugins/electronStore'
import {
  handleIsDarkModeChange
} from '../handlers/electronStore'

export default function () {
  electronStore.onDidChange(
    'layout.isDarkMode',
    handleIsDarkModeChange
  )
}
