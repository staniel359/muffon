import i18n from '&/i18n'
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
        `layout.navigation.model.${pageNameKey}`,
        { modelName: albumTitle }
      )
    } else {
      return albumTitle
    }
  }

  const profileLibraryArtistPageTitle = i18n.global.t(
    'layout.navigation.model.albums',
    { modelName: artistName }
  )

  const profileLibraryPageTitle = i18n.global.t(
    'layout.navigation.model.artists',
    { modelName: profileNickname }
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
