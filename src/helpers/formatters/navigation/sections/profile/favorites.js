import i18n from '*/plugins/i18n'
import {
  main as formatProfileFavoritesMainLink
} from '*/helpers/formatters/links/profile/favorites'

export default function ({ profileId, isActive }) {
  const formatLink = () => {
    if (!isActive) {
      return formatProfileFavoritesMainLink({
        profileId
      })
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
