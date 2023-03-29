import {
  main as formatVideoChannelLink
} from '@/helpers/formatters/links/videoChannel'

export default function (
  {
    channelId,
    channelTitle,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatVideoChannelLink(
        {
          channelId
        }
      )
    }
  }

  return {
    name: channelTitle,
    isActive,
    link: formatLink()
  }
}
