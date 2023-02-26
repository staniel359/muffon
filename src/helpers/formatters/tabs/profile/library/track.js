import i18n from '#/plugins/i18n'
import {
  main as formatProfileLibraryTrackMainLink,
  albums as formatProfileLibraryTrackAlbumsLink,
  playlists as formatProfileLibraryTrackPlaylistsLink
} from '@/helpers/formatters/links/profile/library/track'

export default function (
  {
    profileId,
    profileNickname,
    artistName,
    libraryTrackId,
    trackTitle,
    scope
  }
) {
  function formatProfileLibraryTrackPageTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: trackTitle
        }
      )
    } else {
      return trackTitle
    }
  }

  const profileLibraryArtistPageTitle = i18n.global.t(
    'navigation.model.tracks',
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
    formatProfileLibraryTrackPageTitle(),
    profileLibraryArtistPageTitle,
    profileLibraryPageTitle
  ].join(
    ' | '
  )

  function formatLink () {
    switch (scope) {
      case 'albums':
        return formatProfileLibraryTrackAlbumsLink(
          {
            profileId,
            libraryTrackId
          }
        )
      case 'playlists':
        return formatProfileLibraryTrackPlaylistsLink(
          {
            profileId,
            libraryTrackId
          }
        )
      default:
        return formatProfileLibraryTrackMainLink(
          {
            profileId,
            libraryTrackId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'track',
    title,
    link,
    path: link.path
  }
}
