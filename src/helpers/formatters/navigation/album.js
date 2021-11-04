import i18n from '*/i18n'
import {
  main as formatArtistMainLink,
  albums as formatArtistAlbumsLink
} from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'

export default function ({
  artistName,
  albumTitle,
  sourceParams,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatAlbumMainLink({
        artistName,
        albumTitle,
        sourceParams
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `layout.navigation.model.${pageNameKey}`,
          { modelName: albumTitle }
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
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
      name: i18n.global.t(
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
