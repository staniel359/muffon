import i18n from '*/i18n'
import {
  main as formatProfileLibraryTrackMainLink
} from '#/formatters/links/profile/library/track'

export default function ({
  profileId,
  profileNickname,
  artistName,
  trackId,
  trackTitle,
  pageNameKey
}) {
  const formatProfileLibraryTrackPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `layout.navigation.track.${pageNameKey}`,
        { trackTitle }
      )
    } else {
      return trackTitle
    }
  }

  const profileLibraryArtistPageTitle = i18n.global.t(
    'layout.navigation.artist.tracks',
    { artistName }
  )

  const profileLibraryPageTitle = i18n.global.t(
    'layout.navigation.profile.artists',
    { nickname: profileNickname }
  )

  const title = [
    formatProfileLibraryTrackPageTitle(),
    profileLibraryArtistPageTitle,
    profileLibraryPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      default:
        return formatProfileLibraryTrackMainLink({
          profileId,
          trackId
        }).path
    }
  }

  return {
    icon: 'music',
    title,
    path: formatPath()
  }
}
