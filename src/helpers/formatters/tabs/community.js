import i18n from '#/plugins/i18n'
import {
  main as formatCommunityMainLink,
  posts as formatCommunityPostsLink
} from '@/helpers/formatters/links/community'

export default function (
  {
    communityId,
    communityTitle,
    scope
  }
) {
  function formatIcon () {
    switch (scope) {
      case 'posts':
        return 'post'
      default:
        return 'community'
    }
  }

  const icon = formatIcon()

  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: communityTitle
        }
      )
    } else {
      return communityTitle
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'posts':
        return formatCommunityPostsLink(
          {
            communityId
          }
        )
      default:
        return formatCommunityMainLink(
          {
            communityId
          }
        )
    }
  }

  const link = formatLink()

  return {
    icon,
    title,
    link,
    path: link.path
  }
}
