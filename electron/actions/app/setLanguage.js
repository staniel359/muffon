import i18n from 'i18n'
import setTrayMenu from '#/actions/tray/setMenu'
import setAboutWindowTitle from '#/actions/aboutWindow/setTitle'

export default function (
  value
) {
  i18n.setLocale(
    value
  )

  setTrayMenu()

  setAboutWindowTitle()
}
