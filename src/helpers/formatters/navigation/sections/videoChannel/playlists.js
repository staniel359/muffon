import i18n from '#/plugins/i18n'
import {
  playlists as formatVideoChannelPlaylistsLink
} from '@/helpers/formatters/links/videoChannel'

export default function (
  {
    channelId,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatVideoChannelPlaylistsLink(
        {
          channelId
        }
      )
    }
  }

  return {
    name: i18n.global.t(
      'navigation.playlists'
    ),
    isActive,
    link: formatLink()
  }
}
