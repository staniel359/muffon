import i18n from '#/plugins/i18n'
import {
  main as formatArtistMainLink,
  images as formatArtistImagesLink,
  tracks as formatArtistTracksLink,
  albums as formatArtistAlbumsLink,
  similar as formatArtistSimilarLink
} from '@/helpers/formatters/links/artist'

export default function (
  {
    artistName,
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: artistName
        }
      )
    } else {
      return artistName
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'images':
        return formatArtistImagesLink(
          {
            artistName
          }
        )
      case 'tracks':
        return formatArtistTracksLink(
          {
            artistName
          }
        )
      case 'albums':
        return formatArtistAlbumsLink(
          {
            artistName
          }
        )
      case 'similar':
        return formatArtistSimilarLink(
          {
            artistName
          }
        )
      default:
        return formatArtistMainLink(
          {
            artistName
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'artist',
    title,
    link,
    path: link.path
  }
}
