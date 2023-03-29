import i18n from '@/plugins/i18n'
import {
  main as formatReleasesLink
} from '@/helpers/formatters/links/releases'

export default function (
  {
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatReleasesLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.releases'
    ),
    isActive,
    link: formatLink()
  }
}
