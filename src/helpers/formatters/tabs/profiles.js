import { profiles as formatProfilesLink } from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export default function () {
  return {
    icon: 'user',
    title: localize(
      'layout.navigation.profiles'
    ),
    path: formatProfilesLink().path
  }
}
