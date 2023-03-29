import {
  main as formatArtistLink
} from '@/helpers/formatters/links/artist'

export default function (
  {
    artistName,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatArtistLink(
        {
          artistName
        }
      )
    }
  }

  return {
    name: artistName,
    isActive,
    link: formatLink()
  }
}
