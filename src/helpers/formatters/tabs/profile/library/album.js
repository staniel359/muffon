import i18n from '*/plugins/i18n'
import {
  main as formatProfileLibraryAlbumMainLink,
  tracks as formatProfileLibraryAlbumTracksLink
} from '*/helpers/formatters/links/profile/library/album'

export default function (
  {
    profileId,
    profileNickname,
    artistName,
    albumId,
    albumTitle,
    scope
  }
) {
  function formatProfileLibraryAlbumPageTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: albumTitle
        }
      )
    } else {
      return albumTitle
    }
  }

  const profileLibraryArtistPageTitle = i18n.global.t(
    'navigation.model.albums',
    {
      modelName: artistName
    }
  )

  const profileLibraryPageTitle = i18n.global.t(
    'navigation.model.artists',
    {
      modelName: profileNickname
    }
  )

  const title = [
    formatProfileLibraryAlbumPageTitle(),
    profileLibraryArtistPageTitle,
    profileLibraryPageTitle
  ].join(
    ' | '
  )

  function formatPath () {
    switch (scope) {
      case 'tracks':
        return formatProfileLibraryAlbumTracksLink(
          {
            profileId,
            albumId
          }
        ).path
      default:
        return formatProfileLibraryAlbumMainLink(
          {
            profileId,
            albumId
          }
        ).path
    }
  }

  return {
    icon: 'record vinyl',
    title,
    path: formatPath()
  }
}
