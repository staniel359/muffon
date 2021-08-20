import {
  main as formatArtistMainLink,
  images as formatArtistImagesLink,
  tracks as formatArtistTracksLink,
  albums as formatArtistAlbumsLink,
  similar as formatArtistSimilarLink
} from '#/formatters/links/artist'
import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, pageNameKey }) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.artist.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const title = [
    artistName,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'images':
        return formatArtistImagesLink({
          artistName
        }).path
      case 'tracks':
        return formatArtistTracksLink({
          artistName
        }).path
      case 'albums':
        return formatArtistAlbumsLink({
          artistName
        }).path
      case 'similar':
        return formatArtistSimilarLink({
          artistName
        }).path
      default:
        return formatArtistMainLink({
          artistName
        }).path
    }
  }

  return {
    icon: 'microphone alternate',
    title,
    path: formatPath()
  }
}
