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
        `layout.navigation.model.${pageNameKey}`,
        { modelName: trackTitle }
      )
    } else {
      return trackTitle
    }
  }

  const profileLibraryArtistPageTitle = i18n.global.t(
    'layout.navigation.model.tracks',
    { modelName: artistName }
  )

  const profileLibraryPageTitle = i18n.global.t(
    'layout.navigation.model.artists',
    { modelName: profileNickname }
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
