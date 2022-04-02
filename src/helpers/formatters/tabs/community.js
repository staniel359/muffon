import i18n from '*/plugins/i18n'
import {
  community as formatCommunityLink
} from '*/helpers/formatters/links/communities'

export default function ({ communityId, communityTitle, scope }) {
  const formatTitle = () => {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        { modelName: communityTitle }
      )
    } else {
      return communityTitle
    }
  }

  const formatPath = () => {
    switch (scope) {
      default:
        return formatCommunityLink({
          communityId
        }).path
    }
  }

  return {
    icon: 'users',
    title: formatTitle(),
    path: formatPath()
  }
}
