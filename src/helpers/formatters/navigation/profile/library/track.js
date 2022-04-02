import i18n from '*/plugins/i18n'
import { profiles as formatProfilesLink } from '*/helpers/formatters/links'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink,
  artists as formatProfileLibraryArtistsLink
} from '*/helpers/formatters/links/profile/library'
import {
  main as formatProfileLibraryArtistMainLink,
  tracks as formatProfileLibraryArtistTracksLink
} from '*/helpers/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryTrackMainLink
} from '*/helpers/formatters/links/profile/library/track'

export default function ({
  profileId,
  profileNickname,
  artistId,
  artistName,
  trackId,
  trackTitle,
  scope
}) {
  const formatLink = () => {
    if (scope) {
      return formatProfileLibraryTrackMainLink({
        profileId,
        trackId
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.profiles'
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
      name: i18n.global.t(
        'navigation.library'
      ),
      link: formatProfileLibraryMainLink({
        profileId
      })
    },
    {
      name: i18n.global.t(
        'navigation.artists'
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
      name: i18n.global.t(
        'navigation.tracks'
      ),
      link: formatProfileLibraryArtistTracksLink({
        profileId,
        artistId
      })
    },
    {
      name: trackTitle,
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
