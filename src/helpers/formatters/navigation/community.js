import i18n from '*/plugins/i18n'
import {
  main as formatCommunitiesLink,
  community as formatCommunityLink
} from '*/helpers/formatters/links/communities'

export default function ({ communityId, communityTitle, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatCommunityLink({
        communityId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `navigation.${pageNameKey}`
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
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
