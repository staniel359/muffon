import i18n from '&/i18n'
import {
  recommendations as formatRecommendationsLink
} from '#/formatters/links'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatRecommendationsLink()
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `layout.navigation.recommendations.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'layout.navigation.recommendations'
      ),
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
