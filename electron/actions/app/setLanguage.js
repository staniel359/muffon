import i18n from '../../../shared/plugins/i18n.js'
import setTrayMenu from '../tray/setMenu.js'
import setAboutWindowTitle from '../aboutWindow/setTitle.js'

export default function setLanguage (
  value
) {
  i18n.global.locale = value

  setTrayMenu()

  setAboutWindowTitle()
}
