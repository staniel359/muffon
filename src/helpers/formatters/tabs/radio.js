import i18n from '&/i18n'
import { radio as formatRadioLink } from '#/formatters/links'

export default function () {
  const title = i18n.global.t(
    'layout.navigation.radio'
  )

  const { path } = formatRadioLink()

  return {
    icon: 'broadcast tower',
    title,
    path
  }
}
