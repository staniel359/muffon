import i18n from '@/plugins/i18n'
import {
  main as formatProfileLibraryAlbumMainLink,
  tracks as formatProfileLibraryAlbumTracksLink
} from '@/helpers/formatters/links/profile/library/album'

export default function (
  {
    profileId,
    profileNickname,
    artistName,
    libraryAlbumId,
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

  const profileLibraryArtistPageTitle =
    i18n.global.t(
      'navigation.model.albums',
      {
        modelName: artistName
      }
    )

  const profileLibraryPageTitle =
    i18n.global.t(
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
            libraryAlbumId
          }
        ).path
      default:
        return formatProfileLibraryAlbumMainLink(
          {
            profileId,
            libraryAlbumId
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
