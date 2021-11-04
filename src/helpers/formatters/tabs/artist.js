import i18n from '*/i18n'
import {
  main as formatArtistMainLink,
  images as formatArtistImagesLink,
  tracks as formatArtistTracksLink,
  albums as formatArtistAlbumsLink,
  similar as formatArtistSimilarLink
} from '#/formatters/links/artist'

export default function ({ artistName, pageNameKey }) {
  const formatTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `layout.navigation.model.${pageNameKey}`,
        { modelName: artistName }
      )
    } else {
      return artistName
    }
  }

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
    title: formatTitle(),
    path: formatPath()
  }
}
