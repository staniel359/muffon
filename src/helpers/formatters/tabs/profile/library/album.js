import i18n from '@/plugins/i18n'
import {
  main as formatProfileLibraryAlbumLink,
  tracks as formatProfileLibraryAlbumTracksLink,
  playlists as formatProfileLibraryAlbumPlaylistsLink
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

  function formatLink () {
    switch (scope) {
      case 'tracks':
        return formatProfileLibraryAlbumTracksLink(
          {
            profileId,
            libraryAlbumId
          }
        )
      case 'playlists':
        return formatProfileLibraryAlbumPlaylistsLink(
          {
            profileId,
            libraryAlbumId
          }
        )
      default:
        return formatProfileLibraryAlbumLink(
          {
            profileId,
            libraryAlbumId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'album',
    title,
    link,
    path: link.path
  }
}
