import i18n from '#/plugins/i18n'
import {
  main as formatBookmarksMainLink,
  artists as formatBookmarksArtistsLink,
  albums as formatBookmarksAlbumsLink,
  tracks as formatBookmarksTracksLink,
  videos as formatBookmarksVideosLink
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

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'artists':
        return formatBookmarksArtistsLink()
      case 'albums':
        return formatBookmarksAlbumsLink()
      case 'tracks':
        return formatBookmarksTracksLink()
      case 'videos':
        return formatBookmarksVideosLink()
      default:
        return formatBookmarksMainLink()
    }
  }

  const link = formatLink()

  return {
    icon: 'bookmark',
    title,
    link,
    path: link.path
  }
}
