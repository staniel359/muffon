import i18n from '&/i18n'
import {
  playlist as formatProfilePlaylistLink
} from '#/formatters/links/profile'

export default function ({
  profileId,
  profileNickname,
  playlistId,
  playlistTitle
}) {
  const formatProfilePlaylistsPageTitle = () => {
    return i18n.global.t(
      'layout.navigation.model.playlists',
      { modelName: profileNickname }
    )
  }

  const title = [
    playlistTitle,
    formatProfilePlaylistsPageTitle()
  ].join(' | ')

  const formatPath = () => {
    return formatProfilePlaylistLink({
      profileId,
      playlistId
    }).path
  }

  return {
    icon: 'file audio',
    title,
    path: formatPath()
  }
}
