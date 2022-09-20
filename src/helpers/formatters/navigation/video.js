import formatVideoChannelsSection
  from '@/helpers/formatters/navigation/sections/videoChannels'
import formatVideoChannelSection
  from '@/helpers/formatters/navigation/sections/videoChannel'
import formatVideoChannelVideosSection
  from '@/helpers/formatters/navigation/sections/videoChannel/videos'
import formatVideoSection
  from '@/helpers/formatters/navigation/sections/video'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    videoId,
    videoTitle,
    channelId,
    channelTitle,
    scope
  }
) {
  return [
    formatVideoChannelsSection(),
    formatVideoChannelSection(
      {
        channelId,
        channelTitle
      }
    ),
    formatVideoChannelVideosSection(
      {
        channelId
      }
    ),
    formatVideoSection(
      {
        videoId,
        videoTitle,
        isActive: !scope
      }
    ),
    scope && formatSubpageSection(
      {
        scope
      }
    )
  ].filter(
    e => e
  )
}
