import {
  main as formatVideoMainLink
} from '@/helpers/formatters/links/video'

export default function (
  {
    videoId,
    videoTitle,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatVideoMainLink(
        {
          videoId
        }
      )
    }
  }

  return {
    name: videoTitle,
    isActive,
    link: formatLink()
  }
}
