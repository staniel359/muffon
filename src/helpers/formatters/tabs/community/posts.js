import i18n from '*/plugins/i18n'
import {
  posts as formatCommunityPostsLink
} from '*/helpers/formatters/links/community'

export default function (
  {
    communityId,
    communityTitle
  }
) {
  function formatTitle () {
    return i18n.global.t(
      'navigation.model.posts',
      {
        modelName: communityTitle
      }
    )
  }

  const {
    path
  } = formatCommunityPostsLink(
    {
      communityId
    }
  )

  return {
    icon: 'edit',
    title: formatTitle(),
    path
  }
}
