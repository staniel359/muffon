import i18n from '#/plugins/i18n'
import {
  main as formatProfileFavoritesMainLink,
  artists as formatProfileFavoritesArtistsLink,
  albums as formatProfileFavoritesAlbumsLink,
  tracks as formatProfileFavoritesTracksLink
} from '@/helpers/formatters/links/profile/favorites'

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
        `navigation.model.favoritesModels.${scope}`,
        {
          modelName: profileNickname
        }
      )
    } else {
      return i18n.global.t(
        'navigation.model.favorites',
        {
          modelName: profileNickname
        }
      )
    }
  }

  function formatPath () {
    switch (scope) {
      case 'artists':
        return formatProfileFavoritesArtistsLink(
          {
            profileId
          }
        ).path
      case 'albums':
        return formatProfileFavoritesAlbumsLink(
          {
            profileId
          }
        ).path
      case 'tracks':
        return formatProfileFavoritesTracksLink(
          {
            profileId
          }
        ).path
      default:
        return formatProfileFavoritesMainLink(
          {
            profileId
          }
        ).path
    }
  }

  return {
    icon: 'star',
    title: formatTitle(),
    path: formatPath()
  }
}
