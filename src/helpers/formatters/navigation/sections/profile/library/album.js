import {
  main as formatProfileLibraryAlbumMainLink
} from '*/helpers/formatters/links/profile/library/album'

export default function (
  {
    profileId,
    libraryAlbumId,
    albumTitle,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLibraryAlbumMainLink(
        {
          profileId,
          libraryAlbumId
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
