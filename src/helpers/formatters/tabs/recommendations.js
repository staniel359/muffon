import i18n from '*/i18n'
import {
  recommendations as formatRecommendationsLink
} from '#/formatters/links'

export default function ({ pageNameKey }) {
  const recommendationsPageTitle = i18n.global.t(
    'layout.navigation.recommendations'
  )

  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
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
