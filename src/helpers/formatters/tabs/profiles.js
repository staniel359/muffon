import i18n from '&/i18n'
import { profiles as formatProfilesLink } from '#/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.profiles'
  )

  const { path } = formatProfilesLink()

  return {
    icon: 'user',
    title,
    path
  }
}
