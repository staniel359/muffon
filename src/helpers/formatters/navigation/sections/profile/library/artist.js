import {
  main as formatProfileLibraryArtistLink
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
      return formatProfileLibraryArtistLink(
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
