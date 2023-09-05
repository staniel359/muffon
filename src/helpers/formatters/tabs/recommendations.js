import i18n from '@/plugins/i18n'
import {
  main as formatRecommendationsLink,
  artists as formatRecommendationsArtistsLink,
  tracks as formatRecommendationsTracksLink
} from '@/helpers/formatters/links/recommendations'

export default function (
  {
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.recommendationsCollection.${scope}`
      )
    } else {
      return i18n.global.t(
        'navigation.recommendations'
      )
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'artists':
        return formatRecommendationsArtistsLink()
      case 'tracks':
        return formatRecommendationsTracksLink()
      default:
        return formatRecommendationsLink()
    }
  }

  const link = formatLink()

  return {
    icon: 'recommendation',
    title,
    link,
    path: link.path
  }
}
