import {
  main as formatProfileLibraryTrackLink
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
      return formatProfileLibraryTrackLink(
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
