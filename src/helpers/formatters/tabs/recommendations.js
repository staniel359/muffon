import i18n from '@/plugins/i18n'
import {
  recommendations as formatRecommendationsLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.recommendations'
  )

  const {
    path
  } = formatRecommendationsLink()

  return {
    icon: 'volume up',
    title,
    path
  }
}
