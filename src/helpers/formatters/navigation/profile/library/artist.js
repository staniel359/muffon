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
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    profileId,
    profileNickname,
    libraryArtistId,
    artistName,
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
        artistName,
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
