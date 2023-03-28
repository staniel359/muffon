import i18n from 'i18n'

export default function setTitle () {
  const title =
    i18n.__(
      'about'
    )

  aboutWindow.setTitle(
    title
  )
}
