import i18n from '&/i18n'
import { profiles as formatProfilesLink } from '#/formatters/links'

export default function () {
  const title = i18n.global.t(
    'layout.navigation.profiles'
  )

  const formatPath = () => {
    return formatProfilesLink().path
  }

  return {
    icon: 'user',
    title,
    path: formatPath()
  }
}
