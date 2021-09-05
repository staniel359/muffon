import { main as formatAlbumMainLink } from '#/formatters/links/album'
import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, albumTitle, pageNameKey }) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.album.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const albumPageTitle = [
    albumTitle,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const artistAlbumsPageName = localize(
    'layout.navigation.albums'
  ).toLowerCase()
  const artistPageTitle =
    `${artistName} ${artistAlbumsPageName}`

  const title = [
    albumPageTitle,
    artistPageTitle
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
