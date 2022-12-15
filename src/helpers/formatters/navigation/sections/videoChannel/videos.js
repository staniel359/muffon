import i18n from '#/plugins/i18n'
import {
  videos as formatVideoChannelVideosLink
} from '@/helpers/formatters/links/videoChannel'

export default function (
  {
    channelId,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatVideoChannelVideosLink(
        {
          channelId
        }
      )
    }
  }

  return {
    name: i18n.global.t(
      'navigation.videos'
    ),
    isActive,
    link: formatLink()
  }
}
