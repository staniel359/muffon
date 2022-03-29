import i18n from '*/plugins/i18n'
import {
  posts as formatProfilePostsLink
} from '*/helpers/formatters/links/profile'

export default function ({ profileId, profileNickname }) {
  const formatTitle = () => {
    return i18n.global.t(
      'navigation.model.posts',
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
