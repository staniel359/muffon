import i18n from '#/plugins/i18n'
import {
  recommendations as formatRecommendationsLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.recommendations'
  )

  const link = formatRecommendationsLink()

  return {
    icon: 'recommendation',
    title,
    link,
    path: link.path
  }
}
