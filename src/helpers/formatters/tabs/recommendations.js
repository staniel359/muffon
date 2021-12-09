import i18n from '&/i18n'
import {
  recommendations as formatRecommendationsLink
} from '#/formatters/links'

export default function () {
  const title = i18n.global.t(
    'layout.navigation.recommendations'
  )

  const formatPath = () => {
    return formatRecommendationsLink().path
  }

  return {
    icon: 'volume up',
    title,
    path: formatPath()
  }
}
