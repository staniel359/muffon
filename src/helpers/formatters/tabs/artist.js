import i18n from '*/plugins/i18n'
import {
  main as formatArtistMainLink,
  images as formatArtistImagesLink,
  tracks as formatArtistTracksLink,
  albums as formatArtistAlbumsLink,
  similar as formatArtistSimilarLink
} from '*/helpers/formatters/links/artist'

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

  function formatPath () {
    switch (scope) {
      case 'images':
        return formatArtistImagesLink(
          {
            artistName
          }
        ).path
      case 'tracks':
        return formatArtistTracksLink(
          {
            artistName
          }
        ).path
      case 'albums':
        return formatArtistAlbumsLink(
          {
            artistName
          }
        ).path
      case 'similar':
        return formatArtistSimilarLink(
          {
            artistName
          }
        ).path
      default:
        return formatArtistMainLink(
          {
            artistName
          }
        ).path
    }
  }

  return {
    icon: 'microphone alternate',
    title: formatTitle(),
    path: formatPath()
  }
}
