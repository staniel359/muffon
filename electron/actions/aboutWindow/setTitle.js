import i18n from '../../../shared/plugins/i18n.js'

export default function setTitle () {
  const title =
    i18n.global.t(
      'electron.about'
    )

  aboutWindow.setTitle(
    title
  )
}
