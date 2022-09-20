import i18n from '@/plugins/i18n'
import {
  main as formatVideoChannelMainLink,
  videos as formatVideoChannelVideosLink
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

  function formatPath () {
    switch (scope) {
      case 'videos':
        return formatVideoChannelVideosLink(
          {
            channelId
          }
        ).path
      default:
        return formatVideoChannelMainLink(
          {
            channelId
          }
        ).path
    }
  }

  return {
    icon: 'tv',
    title: formatTitle(),
    path: formatPath()
  }
}
