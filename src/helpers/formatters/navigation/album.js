import {
  main as formatArtistMainLink,
  albums as formatArtistAlbumsLink
} from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import { localize } from '#/actions/plugins/i18n'

export default function ({ artistName, albumTitle, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatAlbumMainLink({
        artistName,
        albumTitle
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: localize(
          `layout.navigation.album.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.artists'
      )
    },
    {
      name: artistName,
      link: formatArtistMainLink({
        artistName
      })
    },
    {
      name: localize(
        'layout.navigation.albums'
      ),
      link: formatArtistAlbumsLink({
        artistName
      })
    },
    {
      name: albumTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
