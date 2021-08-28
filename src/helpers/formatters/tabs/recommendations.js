import {
  recommendations as formatRecommendationsLink
} from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export default function ({ pageNameKey }) {
  const recommendationsPageTitle = localize(
    'layout.navigation.self.recommendations'
  )

  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.recommendations.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const title = [
    recommendationsPageTitle,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const formatPath = () => {
    switch (pageNameKey) {
      default:
        return formatRecommendationsLink().path
    }
  }

  return {
    icon: 'volume up',
    title,
    path: formatPath()
  }
}
