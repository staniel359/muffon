import formatVideoChannelsSection
  from '*/helpers/formatters/navigation/sections/videoChannels'
import formatVideoChannelSection
  from '*/helpers/formatters/navigation/sections/videoChannel'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function (
  {
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
        channelTitle,
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
