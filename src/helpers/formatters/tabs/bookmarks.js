import i18n from '#/plugins/i18n'
import {
  main as formatBookmarksMainLink,
  artists as formatBookmarksArtistsLink,
  albums as formatBookmarksAlbumsLink,
  tracks as formatBookmarksTracksLink
} from '@/helpers/formatters/links/bookmarks'

export default function (
  {
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.bookmarkModels.${scope}`
      )
    } else {
      return i18n.global.t(
        'navigation.bookmarks'
      )
    }
  }

  function formatPath () {
    switch (scope) {
      case 'artists':
        return formatBookmarksArtistsLink().path
      case 'albums':
        return formatBookmarksAlbumsLink().path
      case 'tracks':
        return formatBookmarksTracksLink().path
      default:
        return formatBookmarksMainLink().path
    }
  }

  return {
    icon: 'bookmark',
    title: formatTitle(),
    path: formatPath()
  }
}
