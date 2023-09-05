import i18n from '@/plugins/i18n'
import {
  main as formatRecommendationsLink
} from '@/helpers/formatters/links/recommendations'

export default function (
  {
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatRecommendationsLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.recommendations'
    ),
    isActive,
    link: formatLink()
  }
}
