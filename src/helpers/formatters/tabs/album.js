import i18n from '&/i18n'
import { main as formatAlbumMainLink } from '#/formatters/links/album'

export default function ({
  artistName,
  albumTitle,
  sourceParams,
  pageNameKey
}) {
  const formatAlbumPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: albumTitle }
      )
    } else {
      return albumTitle
    }
  }

  const artistAlbumsPageName = i18n.global.t(
    'navigation.model.albums',
    { modelName: artistName }
  )

  const title = [
    formatAlbumPageTitle(),
    artistAlbumsPageName
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      default:
        return formatAlbumMainLink({
          artistName,
          albumTitle,
          sourceParams
        }).path
    }
  }

  return {
    icon: 'record vinyl',
    title,
    path: formatPath()
  }
}
