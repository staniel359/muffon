import formatVideoChannelsSection
  from '@/helpers/formatters/navigation/sections/videoChannels'
import formatVideoChannelSection
  from '@/helpers/formatters/navigation/sections/videoChannel'
import formatVideoChannelPlaylistsSection
  from '@/helpers/formatters/navigation/sections/videoChannel/playlists'
import formatVideoPlaylistSection
  from '@/helpers/formatters/navigation/sections/videoPlaylist'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    playlistId,
    playlistTitle,
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
    formatVideoChannelPlaylistsSection(
      {
        channelId
      }
    ),
    formatVideoPlaylistSection(
      {
        playlistId,
        playlistTitle,
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
