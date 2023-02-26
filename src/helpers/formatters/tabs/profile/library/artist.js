import i18n from '#/plugins/i18n'
import {
  main as formatProfileLibraryArtistMainLink,
  albums as formatProfileLibraryArtistAlbumsLink,
  tracks as formatProfileLibraryArtistTracksLink,
  playlists as formatProfileLibraryArtistPlaylistsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default function (
  {
    profileId,
    profileNickname,
    libraryArtistId,
    artistName,
    scope
  }
) {
  function formatProfileLibraryArtistPageTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: artistName
        }
      )
    } else {
      return artistName
    }
  }

  const profileLibraryPageTitle =
    i18n.global.t(
      'navigation.model.artists',
      {
        modelName: profileNickname
      }
    )

  const title = [
    formatProfileLibraryArtistPageTitle(),
    profileLibraryPageTitle
  ].join(
    ' | '
  )

  function formatLink () {
    switch (scope) {
      case 'albums':
        return formatProfileLibraryArtistAlbumsLink(
          {
            profileId,
            libraryArtistId
          }
        )
      case 'tracks':
        return formatProfileLibraryArtistTracksLink(
          {
            profileId,
            libraryArtistId
          }
        )
      case 'playlists':
        return formatProfileLibraryArtistPlaylistsLink(
          {
            profileId,
            libraryArtistId
          }
        )
      default:
        return formatProfileLibraryArtistMainLink(
          {
            profileId,
            libraryArtistId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'artist',
    title,
    link,
    path: link.path
  }
}
