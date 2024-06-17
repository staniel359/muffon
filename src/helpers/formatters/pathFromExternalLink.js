import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'
import {
  main as formatVideoChannelLink
} from '@/helpers/formatters/links/videoChannel'
import {
  main as formatVideoPlaylistLink
} from '@/helpers/formatters/links/videoPlaylist'

const formatters = [
  {
    id: 'playlist',
    regexp:
      /https:\/\/www\.youtube\.com\/watch\?.?list=([\w_-]+)/,
    formatPath: id => {
      return formatVideoPlaylistLink(
        {
          playlistId: id
        }
      ).path
    }
  },
  {
    id: 'video',
    regexp:
      /https:\/\/www\.youtube\.com\/watch\?.*v=([\w_-]+)(?!.+&feature=(emb_title|emb_imp_woyt))/,
    formatPath: id => {
      return formatVideoLink(
        {
          videoId: id
        }
      ).path
    }
  },
  {
    id: 'channel',
    regexp:
      /https:\/\/www\.youtube\.com\/channel\/([\w_-]+)/,
    formatPath: id => {
      return formatVideoChannelLink(
        {
          channelId: id
        }
      ).path
    }
  }
]

export default function (
  {
    link
  }
) {
  function formatFormatter (
    formatterData
  ) {
    const matchedString =
      link.match(
        formatterData.regexp
      )?.[1]

    return {
      ...formatterData,
      matchedString
    }
  }

  const formattersFormatted =
    formatters.map(
      formatFormatter
    )

  function isMatchedFormatter (
    formatterData
  ) {
    return !!formatterData.matchedString
  }

  const formatter =
    formattersFormatted.find(
      isMatchedFormatter
    )

  if (formatter) {
    return formatter.formatPath(
      formatter.matchedString
    )
  }
}
