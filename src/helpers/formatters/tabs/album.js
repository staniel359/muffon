import i18n from '*/i18n'
import { main as formatAlbumMainLink } from '#/formatters/links/album'

export default function ({ artistName, albumTitle, pageNameKey }) {
  const formatAlbumPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `layout.navigation.album.${pageNameKey}`,
        { albumTitle }
      )
    } else {
      return albumTitle
    }
  }

  const artistAlbumsPageName = i18n.global.t(
    'layout.navigation.artist.albums',
    { artistName }
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
          albumTitle
        }).path
    }
  }

  return {
    icon: 'record vinyl',
    title,
    path: formatPath()
  }
}
