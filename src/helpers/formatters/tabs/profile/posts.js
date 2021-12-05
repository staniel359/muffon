import i18n from '&/i18n'
import {
  posts as formatProfilePostsLink
} from '#/formatters/links/profile'

export default function ({ profileId, profileNickname }) {
  const formatTitle = () => {
    return i18n.global.t(
      'layout.navigation.model.posts',
      { modelName: profileNickname }
    )
  }

  const formatPath = () => {
    return formatProfilePostsLink({
      profileId
    }).path
  }

  return {
    icon: 'edit',
    title: formatTitle(),
    path: formatPath()
  }
}
