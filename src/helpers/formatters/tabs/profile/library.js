import i18n from '#/plugins/i18n'
import {
  main as formatProfileLibraryMainLink,
  artists as formatProfileLibraryArtistsLink,
  albums as formatProfileLibraryAlbumsLink,
  tracks as formatProfileLibraryTracksLink
} from '@/helpers/formatters/links/profile/library'

export default function (
  {
    profileId,
    profileNickname,
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: profileNickname
        }
      )
    } else {
      return i18n.global.t(
        'navigation.model.library',
        {
          modelName: profileNickname
        }
      )
    }
  }

  function formatPath () {
    switch (scope) {
      case 'artists':
        return formatProfileLibraryArtistsLink(
          {
            profileId
          }
        ).path
      case 'albums':
        return formatProfileLibraryAlbumsLink(
          {
            profileId
          }
        ).path
      case 'tracks':
        return formatProfileLibraryTracksLink(
          {
            profileId
          }
        ).path
      default:
        return formatProfileLibraryMainLink(
          {
            profileId
          }
        ).path
    }
  }

  return {
    icon: 'library',
    title: formatTitle(),
    path: formatPath()
  }
}
