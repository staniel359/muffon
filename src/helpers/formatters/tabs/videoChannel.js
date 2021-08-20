import {
  videos as formatVideoChannelVideosLink
} from '#/formatters/links/videoChannel'
import { localize } from '#/actions/plugins/i18n'

export default function ({ channelTitle, channelId }) {
  const videoChannelVideosPageName = localize(
    'layout.navigation.videoChannel.videos'
  ).toLowerCase()

  const title = [
    channelTitle,
    videoChannelVideosPageName
  ].join(' ')

  const formatPath = () => {
    return formatVideoChannelVideosLink({
      channelId
    }).path
  }

  return {
    icon: 'tv',
    title,
    path: formatPath()
  }
}
