import i18n from '*/i18n'
import {
  main as formatProfileLibraryAlbumMainLink,
  tracks as formatProfileLibraryAlbumTracksLink
} from '#/formatters/links/profile/library/album'

export default function ({
  profileId,
  profileNickname,
  artistName,
  albumId,
  albumTitle,
  pageNameKey
}) {
  const formatProfileLibraryAlbumPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `layout.navigation.album.${pageNameKey}`,
        { albumTitle }
      )
    } else {
      return albumTitle
    }
  }

  const profileLibraryArtistPageTitle = i18n.global.t(
    'layout.navigation.artist.albums',
    { artistName }
  )

  const profileLibraryPageTitle = i18n.global.t(
    'layout.navigation.profile.artists',
    { nickname: profileNickname }
  )

  const title = [
    formatProfileLibraryAlbumPageTitle(),
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
