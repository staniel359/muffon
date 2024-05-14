import i18n from 'i18n'
import setTrayMenu from '../tray/setMenu.js'
import setAboutWindowTitle from '../aboutWindow/setTitle.js'

export default function (
  value
) {
  i18n.setLocale(
    value
  )

  setTrayMenu()

  setAboutWindowTitle()
}
