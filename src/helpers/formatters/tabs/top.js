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

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'artists':
        return formatTopArtistsLink()
      case 'albums':
        return formatTopAlbumsLink()
      case 'tracks':
        return formatTopTracksLink()
      case 'tags':
        return formatTopTagsLink()
      default:
        return formatTopMainLink()
    }
  }

  const link = formatLink()

  return {
    icon: 'top',
    title,
    link,
    path: link.path
  }
}
