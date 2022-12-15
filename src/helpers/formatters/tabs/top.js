import i18n from '#/plugins/i18n'
import {
  main as formatTopMainLink,
  artists as formatTopArtistsLink,
  albums as formatTopAlbumsLink,
  tracks as formatTopTracksLink,
  tags as formatTopTagsLink
} from '@/helpers/formatters/links/top'

export default function (
  {
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.topCollection.${scope}`
      )
    } else {
      return i18n.global.t(
        'navigation.top'
      )
    }
  }

  function formatPath () {
    switch (scope) {
      case 'artists':
        return formatTopArtistsLink().path
      case 'albums':
        return formatTopAlbumsLink().path
      case 'tracks':
        return formatTopTracksLink().path
      case 'tags':
        return formatTopTagsLink().path
      default:
        return formatTopMainLink().path
    }
  }

  return {
    icon: 'arrow alternate circle up',
    title: formatTitle(),
    path: formatPath()
  }
}
