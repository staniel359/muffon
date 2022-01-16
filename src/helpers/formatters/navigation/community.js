import i18n from '&/i18n'
import {
  main as formatCommunitiesLink,
  community as formatCommunityLink
} from '#/formatters/links/communities'

export default function ({ communityTitle, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatCommunityLink({
        communityTitle
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
