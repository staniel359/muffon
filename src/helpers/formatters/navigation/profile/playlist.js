import formatProfilesSection
  from '*/helpers/formatters/navigation/sections/profiles'
import formatProfileSection
  from '*/helpers/formatters/navigation/sections/profile'
import formatProfilePlaylistsSection
  from '*/helpers/formatters/navigation/sections/profile/playlists'

export default function (
  {
    profileId,
    profileNickname,
    playlistTitle
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
    formatProfilePlaylistsSection(
      {
        profileId
      }
    ),
    {
      name: playlistTitle,
      isActive: true
    }
  ]
}
