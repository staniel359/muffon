import {
  main as formatProfileLibraryAlbumMainLink,
  tracks as formatProfileLibraryAlbumTracksLink
} from '#/formatters/links/profile/library/album'
import { localize } from '#/actions/plugins/i18n'

export default function ({
  profileId,
  profileNickname,
  artistName,
  albumId,
  albumTitle,
  pageNameKey
}) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.library.album.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const profileLibraryAlbumPageTitle = [
    albumTitle,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const profileLibraryArtistAlbumsPageName = localize(
    'layout.navigation.library.artist.albums'
  ).toLowerCase()
  const profileLibraryArtistPageTitle =
    `${artistName} ${profileLibraryArtistAlbumsPageName}`

  const profileLibraryArtistsPageName = localize(
    'layout.navigation.library.artists'
  ).toLowerCase()
  const profileLibraryPageTitle =
    `${profileNickname} ${profileLibraryArtistsPageName}`

  const title = [
    profileLibraryAlbumPageTitle,
    profileLibraryArtistPageTitle,
    profileLibraryPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'tracks':
        return formatProfileLibraryAlbumTracksLink({
          profileId,
          albumId
        }).path
      default:
        return formatProfileLibraryAlbumMainLink({
          profileId,
          albumId
        }).path
    }
  }

  return {
    icon: 'record vinyl',
    title,
    path: formatPath()
  }
}
