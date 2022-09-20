import {
  main as formatTrackMainLink
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
      return formatTrackMainLink(
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
