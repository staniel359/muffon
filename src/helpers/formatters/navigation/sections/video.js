import {
  main as formatVideoLink
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
      return formatVideoLink(
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
