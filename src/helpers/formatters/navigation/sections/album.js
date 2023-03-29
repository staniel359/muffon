import {
  main as formatAlbumLink
} from '@/helpers/formatters/links/album'

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
      return formatAlbumLink(
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
