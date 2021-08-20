import {
  videos as formatVideoChannelVideosLink
} from '#/formatters/links/videoChannel'
import { main as formatVideoMainLink } from '#/formatters/links/video'
import { localize } from '#/actions/plugins/i18n'

export default function ({
  videoId,
  videoTitle,
  channelId,
  channelTitle,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatVideoMainLink({
        videoId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: localize(
          `layout.navigation.video.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.videos'
      )
    },
    { name: channelTitle },
    {
      name: localize(
        'layout.navigation.video.channel.videos'
      ),
      link: formatVideoChannelVideosLink({
        channelId
      })
    },
    {
      name: videoTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
