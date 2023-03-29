import i18n from '@/plugins/i18n'
import {
  main as formatProfileFavoritesLink
} from '@/helpers/formatters/links/profile/favorites'

export default function (
  {
    profileId,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatProfileFavoritesLink(
        {
          profileId
        }
      )
    }
  }

  return {
    name: i18n.global.t(
      'navigation.favorites'
    ),
    isActive,
    link: formatLink()
  }
}
