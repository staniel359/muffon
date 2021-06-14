import {
  videoChannelVideos as formatVideoChannelVideosLink,
  videoMain as formatVideoMainLink
} from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export function navigation ({
  videoId,
  videoTitle = '...',
  channelId,
  channelTitle = '...',
  pageNameKey
}) {
  const videosPageName = localize(
    'layout.navigation.videos'
  )

  const channelVideosPageName = localize(
    'layout.navigation.video.channel.videos'
  )
  const channelVideosLink = formatVideoChannelVideosLink({
    channelId
  })

  const formatLink = () => {
    if (pageNameKey) {
      return formatVideoMainLink({
        videoId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      const videoPageName = localize(
        `layout.navigation.video.${pageNameKey}`
      )

      return {
        name: videoPageName,
        isActive: true
      }
    }
  }

  return [
    { name: videosPageName },
    { name: channelTitle },
    {
      name: channelVideosPageName,
      link: channelVideosLink
    },
    {
      name: videoTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
