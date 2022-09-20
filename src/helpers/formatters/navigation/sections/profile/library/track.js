import {
  main as formatProfileLibraryTrackMainLink
} from '@/helpers/formatters/links/profile/library/track'

export default function (
  {
    profileId,
    libraryTrackId,
    trackTitle,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileLibraryTrackMainLink(
        {
          profileId,
          libraryTrackId
        }
      )
    }
  }
  return {
    name: trackTitle,
    isActive,
    link: formatLink()
  }
}
