import i18n from '*/plugins/i18n'
import {
  profiles as formatProfilesLink
} from '*/helpers/formatters/links'

export default function (
  {
    isActive
  } = {}
) {
  function formatLink () {
    if (!isActive) {
      return formatProfilesLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.profiles'
    ),
    isActive,
    link: formatLink()
  }
}
