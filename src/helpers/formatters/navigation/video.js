import i18n from '*/plugins/i18n'
import {
  videos as formatVideoChannelVideosLink
} from '*/helpers/formatters/links/videoChannel'
import { main as formatVideoMainLink } from '*/helpers/formatters/links/video'

export default function ({
  videoId,
  videoTitle,
  channelId,
  channelTitle,
  scope
}) {
  const formatLink = () => {
    if (scope) {
      return formatVideoMainLink({
        videoId
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.videoChannels'
      )
    },
    { name: channelTitle },
    {
      name: i18n.global.t(
        'navigation.videos'
      ),
      link: formatVideoChannelVideosLink({
        channelId
      })
    },
    {
      name: videoTitle,
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
