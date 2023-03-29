import {
  main as formatTrackLink
} from '@/helpers/formatters/links/track'

export default function (
  {
    artistName,
    trackTitle,
    sourceParams,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatTrackLink(
        {
          artistName,
          trackTitle,
          sourceParams
        }
      )
    }
  }

  return {
    name: trackTitle,
    isActive,
    link: formatLink()
  }
}
