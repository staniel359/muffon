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
import formatProfileLibraryArtistAlbumsSection
  from '@/helpers/formatters/navigation/sections/profile/library/artist/albums'
import formatProfileLibraryAlbumSection
  from '@/helpers/formatters/navigation/sections/profile/library/album'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    profileId,
    profileNickname,
    libraryArtistId,
    artistName,
    libraryAlbumId,
    albumTitle,
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
    formatProfileLibraryArtistAlbumsSection(
      {
        profileId,
        libraryArtistId
      }
    ),
    formatProfileLibraryAlbumSection(
      {
        profileId,
        libraryAlbumId,
        albumTitle,
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
