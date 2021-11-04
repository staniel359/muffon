import i18n from '*/i18n'
import {
  favorites as formatProfileFavoritesLink
} from '#/formatters/links/profile'

export default function ({ profileId, profileNickname }) {
  const title = i18n.global.t(
    'layout.navigation.model.favorites',
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
