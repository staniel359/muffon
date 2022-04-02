import {
  community as formatCommunityLink
} from '*/helpers/formatters/links/communities'

export default function ({ communityId, communityTitle, isActive }) {
  const formatLink = () => {
    if (!isActive) {
      return formatCommunityLink({
        communityId
      })
    }
  }

  return {
    name: communityTitle,
    isActive,
    link: formatLink()
  }
}
