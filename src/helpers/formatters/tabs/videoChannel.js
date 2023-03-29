import i18n from '@/plugins/i18n'
import {
  main as formatVideoChannelLink,
  videos as formatVideoChannelVideosLink,
  playlists as formatVideoChannelPlaylistsLink
} from '@/helpers/formatters/links/videoChannel'

export default function (
  {
    channelTitle,
    channelId,
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: channelTitle
        }
      )
    } else {
      return channelTitle
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'videos':
        return formatVideoChannelVideosLink(
          {
            channelId
          }
        )
      case 'playlists':
        return formatVideoChannelPlaylistsLink(
          {
            channelId
          }
        )
      default:
        return formatVideoChannelLink(
          {
            channelId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'videoChannel',
    title,
    link,
    path: link.path
  }
}
