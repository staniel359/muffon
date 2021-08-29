import { profiles as formatProfilesLink } from '#/formatters/links'
import { main as formatProfileMainLink } from '#/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink,
  artists as formatProfileLibraryArtistsLink
} from '#/formatters/links/profile/library'
import {
  main as formatProfileLibraryArtistMainLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import { localize } from '#/actions/plugins/i18n'

export default function ({
  profileId,
  profileNickname,
  artistId,
  artistName,
  albumId,
  albumTitle,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatProfileLibraryAlbumMainLink({
        profileId,
        albumId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: localize(
          `layout.navigation.library.album.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.profiles'
      ),
      link: formatProfilesLink()
    },
    {
      name: profileNickname,
      link: formatProfileMainLink({
        profileId
      })
    },
    {
      name: localize(
        'layout.navigation.profile.library'
      ),
      link: formatProfileLibraryMainLink({
        profileId
      })
    },
    {
      name: localize(
        'layout.navigation.library.artists'
      ),
      link: formatProfileLibraryArtistsLink({
        profileId
      })
    },
    {
      name: artistName,
      link: formatProfileLibraryArtistMainLink({
        profileId,
        artistId
      })
    },
    {
      name: localize(
        'layout.navigation.library.albums'
      ),
      link: formatProfileLibraryArtistAlbumsLink({
        profileId,
        artistId
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
