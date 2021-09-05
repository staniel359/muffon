import {
  main as formatProfileLibraryTrackMainLink
} from '#/formatters/links/profile/library/track'
import { localize } from '#/actions/plugins/i18n'

export default function ({
  profileId,
  profileNickname,
  artistName,
  trackId,
  trackTitle,
  pageNameKey
}) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const profileLibraryTrackPageTitle = [
    trackTitle,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const profileLibraryArtistTracksPageName = localize(
    'layout.navigation.tracks'
  ).toLowerCase()
  const profileLibraryArtistPageTitle =
    `${artistName} ${profileLibraryArtistTracksPageName}`

  const profileLibraryArtistsPageName = localize(
    'layout.navigation.artists'
  ).toLowerCase()
  const profileLibraryPageTitle =
    `${profileNickname} ${profileLibraryArtistsPageName}`

  const title = [
    profileLibraryTrackPageTitle,
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
