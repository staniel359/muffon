import { profiles as formatProfilesLink } from '#/formatters/links'
import { main as formatProfileMainLink } from '#/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink,
  artists as formatProfileLibraryArtistsLink
} from '#/formatters/links/profile/library'
import {
  main as formatProfileLibraryArtistMainLink,
  tracks as formatProfileLibraryArtistTracksLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryTrackMainLink
} from '#/formatters/links/profile/library/track'
import { localize } from '#/actions/plugins/i18n'

export default function ({
  profileId,
  profileNickname,
  artistId,
  artistName,
  trackId,
  trackTitle,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatProfileLibraryTrackMainLink({
        profileId,
        trackId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: localize(
          `layout.navigation.library.track.${pageNameKey}`
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
        'layout.navigation.library.tracks'
      ),
      link: formatProfileLibraryArtistTracksLink({
        profileId,
        artistId
      })
    },
    {
      name: trackTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
