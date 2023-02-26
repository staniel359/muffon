import i18n from '#/plugins/i18n'
import {
  main as formatProfileFavoritesMainLink,
  artists as formatProfileFavoritesArtistsLink,
  albums as formatProfileFavoritesAlbumsLink,
  tracks as formatProfileFavoritesTracksLink,
  videos as formatProfileFavoritesVideosLink
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

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'artists':
        return formatProfileFavoritesArtistsLink(
          {
            profileId
          }
        )
      case 'albums':
        return formatProfileFavoritesAlbumsLink(
          {
            profileId
          }
        )
      case 'tracks':
        return formatProfileFavoritesTracksLink(
          {
            profileId
          }
        )
      case 'videos':
        return formatProfileFavoritesVideosLink(
          {
            profileId
          }
        )
      default:
        return formatProfileFavoritesMainLink(
          {
            profileId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon: 'favorite',
    title,
    link,
    path: link.path
  }
}
