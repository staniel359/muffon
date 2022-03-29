import i18n from '*/plugins/i18n'
import { profiles as formatProfilesLink } from '*/helpers/formatters/links'
import {
  main as formatProfileMainLink,
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

export default function ({ profileId, profileNickname, playlistTitle }) {
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
        'navigation.playlists'
      ),
      link: formatProfilePlaylistsLink({
        profileId
      })
    },
    {
      name: playlistTitle,
      isActive: true
    }
  ]
}
