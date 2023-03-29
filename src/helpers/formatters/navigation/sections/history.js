import i18n from '@/plugins/i18n'
import {
  main as formatHistoryLink
} from '@/helpers/formatters/links/history'

export default function (
  {
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatHistoryLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.history'
    ),
    isActive,
    link: formatLink()
  }
}
