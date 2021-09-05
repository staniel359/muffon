import {
  main as formatProfileLibraryArtistMainLink,
  albums as formatProfileLibraryArtistAlbumsLink,
  tracks as formatProfileLibraryArtistTracksLink
} from '#/formatters/links/profile/library/artist'
import { localize } from '#/actions/plugins/i18n'

export default function ({
  profileId,
  profileNickname,
  artistId,
  artistName,
  pageNameKey
}) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const profileLibraryArtistPageTitle = [
    artistName,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const profileLibraryArtistsPageName = localize(
    'layout.navigation.artists'
  ).toLowerCase()
  const profileLibraryPageTitle =
    `${profileNickname} ${profileLibraryArtistsPageName}`

  const title = [
    profileLibraryArtistPageTitle,
    profileLibraryPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'albums':
        return formatProfileLibraryArtistAlbumsLink({
          profileId,
          artistId
        }).path
      case 'tracks':
        return formatProfileLibraryArtistTracksLink({
          profileId,
          artistId
        }).path
      default:
        return formatProfileLibraryArtistMainLink({
          profileId,
          artistId
        }).path
    }
  }

  return {
    icon: 'microphone alternate',
    title,
    path: formatPath()
  }
}
