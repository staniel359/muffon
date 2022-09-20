import formatProfilesSection
  from '@/helpers/formatters/navigation/sections/profiles'
import formatProfileSection
  from '@/helpers/formatters/navigation/sections/profile'
import formatProfileLibrarySection
  from '@/helpers/formatters/navigation/sections/profile/library'
import formatProfileLibraryArtistsSection
  from '@/helpers/formatters/navigation/sections/profile/library/artists'
import formatProfileLibraryArtistSection
  from '@/helpers/formatters/navigation/sections/profile/library/artist'
import formatProfileLibraryArtistTracksSection
  from '@/helpers/formatters/navigation/sections/profile/library/artist/tracks'
import formatProfileLibraryTrackSection
  from '@/helpers/formatters/navigation/sections/profile/library/track'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    profileId,
    profileNickname,
    libraryArtistId,
    artistName,
    libraryTrackId,
    trackTitle,
    scope
  }
) {
  return [
    formatProfilesSection(),
    formatProfileSection(
      {
        profileId,
        profileNickname
      }
    ),
    formatProfileLibrarySection(
      {
        profileId
      }
    ),
    formatProfileLibraryArtistsSection(
      {
        profileId
      }
    ),
    formatProfileLibraryArtistSection(
      {
        profileId,
        libraryArtistId,
        artistName
      }
    ),
    formatProfileLibraryArtistTracksSection(
      {
        profileId,
        libraryArtistId
      }
    ),
    formatProfileLibraryTrackSection(
      {
        profileId,
        libraryTrackId,
        trackTitle,
        isActive: !scope
      }
    ),
    scope && formatSubpageSection(
      {
        scope
      }
    )
  ].filter(
    e => e
  )
}
