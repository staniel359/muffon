import i18n from '*/plugins/i18n'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

export default function ({ profileId }) {
  return {
    name: i18n.global.t(
      'navigation.playlists'
    ),
    link: formatProfilePlaylistsLink({
      profileId
    })
  }
}
