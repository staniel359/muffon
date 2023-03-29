import {
  main as formatProfileLibraryAlbumLink
} from '@/helpers/formatters/links/profile/library/album'

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
      return formatProfileLibraryAlbumLink(
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
