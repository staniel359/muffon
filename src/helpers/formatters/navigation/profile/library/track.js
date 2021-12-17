import i18n from '&/i18n'
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
        name: i18n.global.t(
          `navigation.${pageNameKey}`
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
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
