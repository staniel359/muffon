import {
  main as formatProfileLibraryArtistMainLink
} from '*/helpers/formatters/links/profile/library/artist'

export default function (
  {
    profileId,
    artistId,
    artistName,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLibraryArtistMainLink(
        {
          profileId,
          artistId
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
