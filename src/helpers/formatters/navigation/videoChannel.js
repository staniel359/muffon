import formatVideoChannelsSection
  from '*/helpers/formatters/navigation/sections/videoChannels'
import formatVideoChannelSection
  from '*/helpers/formatters/navigation/sections/videoChannel'
import formatVideosSection
  from '*/helpers/formatters/navigation/sections/videos'

export default function ({ channelId, channelTitle }) {
  return [
    formatVideoChannelsSection(),
    formatVideoChannelSection({
      channelTitle
    }),
    formatVideosSection({
      channelId,
      isActive: true
    })
  ]
}
