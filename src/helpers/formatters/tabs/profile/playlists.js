import i18n from '*/plugins/i18n'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

export default function (
  {
    profileId,
    profileNickname
  }
) {
  function formatTitle () {
    return i18n.global.t(
      'navigation.model.playlists',
      {
        modelName: profileNickname
      }
    )
  }

  const {
    path
  } = formatProfilePlaylistsLink(
    {
      profileId
    }
  )

  return {
    icon: 'file audio',
    title: formatTitle(),
    path
  }
}
