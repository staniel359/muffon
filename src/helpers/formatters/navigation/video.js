import formatVideoChannelsSection
  from '*/helpers/formatters/navigation/sections/videoChannels'
import formatVideoChannelSection
  from '*/helpers/formatters/navigation/sections/videoChannel'
import formatVideosSection
  from '*/helpers/formatters/navigation/sections/videos'
import formatVideoSection
  from '*/helpers/formatters/navigation/sections/video'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

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
        channelTitle
      }
    ),
    formatVideosSection(
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
