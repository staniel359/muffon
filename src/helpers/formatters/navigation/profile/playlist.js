import i18n from '&/i18n'
import { profiles as formatProfilesLink } from '#/formatters/links'
import {
  main as formatProfileMainLink,
  playlists as formatProfilePlaylistsLink
} from '#/formatters/links/profile'

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
