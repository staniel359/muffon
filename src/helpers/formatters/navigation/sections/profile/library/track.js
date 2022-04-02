import {
  main as formatProfileLibraryTrackMainLink
} from '*/helpers/formatters/links/profile/library/track'

export default function ({ profileId, trackId, trackTitle, isActive }) {
  const formatLink = () => {
    if (!isActive) {
      return formatProfileLibraryTrackMainLink({
        profileId,
        trackId
      })
    }
  }
  return {
    name: trackTitle,
    isActive,
    link: formatLink()
  }
}
