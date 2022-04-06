import i18n from '*/plugins/i18n'
import {
  posts as formatCommunityPostsLink
} from '*/helpers/formatters/links/community'

export default function ({ communityId, communityTitle }) {
  const formatTitle = () => {
    return i18n.global.t(
      'navigation.model.posts',
      { modelName: communityTitle }
    )
  }

  const formatPath = () => {
    return formatCommunityPostsLink({
      communityId
    }).path
  }

  return {
    icon: 'edit',
    title: formatTitle(),
    path: formatPath()
  }
}
