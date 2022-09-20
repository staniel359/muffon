import {
  main as formatProfileLibraryArtistMainLink
} from '@/helpers/formatters/links/profile/library/artist'

export default function (
  {
    profileId,
    libraryArtistId,
    artistName,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLibraryArtistMainLink(
        {
          profileId,
          libraryArtistId
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
