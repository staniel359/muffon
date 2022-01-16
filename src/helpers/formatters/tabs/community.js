import i18n from '&/i18n'
import {
  community as formatCommunityLink
} from '#/formatters/links/communities'

export default function ({ communityId, communityTitle, pageNameKey }) {
  const formatTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `navigation.model.${pageNameKey}`,
        { modelName: communityTitle }
      )
    } else {
      return communityTitle
    }
  }

  const formatPath = () => {
    switch (pageNameKey) {
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
