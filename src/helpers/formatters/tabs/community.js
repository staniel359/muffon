import i18n from '*/plugins/i18n'
import {
  main as formatCommunityMainLink
} from '*/helpers/formatters/links/community'

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
        return formatCommunityMainLink({
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
