import i18n from '*/plugins/i18n'
import {
  favorites as formatProfileFavoritesLink
} from '*/helpers/formatters/links/profile'

export default function ({ profileId, profileNickname }) {
  const title = i18n.global.t(
    'navigation.model.favorites',
    { modelName: profileNickname }
  )

  const formatPath = () => {
    return formatProfileFavoritesLink({
      profileId
    }).path
  }

  return {
    icon: 'star',
    title,
    path: formatPath()
  }
}
