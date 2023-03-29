import i18n from '@/plugins/i18n'
import {
  main as formatTopLink
} from '@/helpers/formatters/links/top'

export default function (
  {
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatTopLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.top'
    ),
    isActive,
    link: formatLink()
  }
}
