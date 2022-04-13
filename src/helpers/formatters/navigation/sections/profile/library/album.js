import {
  main as formatProfileLibraryAlbumMainLink
} from '*/helpers/formatters/links/profile/library/album'

export default function (
  {
    profileId,
    albumId,
    albumTitle,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLibraryAlbumMainLink(
        {
          profileId,
          albumId
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
