import {
  artistMain as formatArtistMainLink,
  artistAlbums as formatArtistAlbumsLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export function navigation ({
  artistName = '...',
  albumTitle = '...',
  pageNameKey
}) {
  const artistsPageName = localize(
    'layout.navigation.artists'
  )

  const artistMainLink = formatArtistMainLink({
    artistName
  })

  const artistAlbumsPageName = localize(
    'layout.navigation.artist.albums'
  )
  const artistAlbumsLink = formatArtistAlbumsLink({
    artistName
  })

  const formatLink = () => {
    if (pageNameKey) {
      return formatAlbumMainLink({
        artistName, albumTitle
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      const albumPageName = localize(
        `layout.navigation.album.${pageNameKey}`
      )

      return {
        name: albumPageName,
        isActive: true
      }
    }
  }

  return [
    { name: artistsPageName },
    {
      name: artistName,
      link: artistMainLink
    },
    {
      name: artistAlbumsPageName,
      link: artistAlbumsLink
    },
    {
      name: albumTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
