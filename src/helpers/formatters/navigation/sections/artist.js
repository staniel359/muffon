import {
  main as formatArtistMainLink
} from '*/helpers/formatters/links/artist'

export default function (
  {
    artistName,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatArtistMainLink(
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
