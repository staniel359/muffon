import {
  main as formatAlbumMainLink
} from '*/helpers/formatters/links/album'

export default function (
  {
    artistName,
    albumTitle,
    sourceParams,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatAlbumMainLink(
        {
          artistName,
          albumTitle,
          sourceParams
        }
      )
    }
  }

  return {
    name: albumTitle,
    isActive,
    link: formatLink()
  }
}
