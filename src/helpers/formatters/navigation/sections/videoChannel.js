import {
  main as formatVideoChannelMainLink
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
      return formatVideoChannelMainLink(
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
