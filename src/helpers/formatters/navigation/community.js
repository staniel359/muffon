import i18n from '*/plugins/i18n'
import {
  main as formatCommunitiesLink,
  community as formatCommunityLink
} from '*/helpers/formatters/links/communities'

export default function ({ communityId, communityTitle, scope }) {
  const formatLink = () => {
    if (scope) {
      return formatCommunityLink({
        communityId
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.communities'
      ),
      link: formatCommunitiesLink()
    },
    {
      name: communityTitle,
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
