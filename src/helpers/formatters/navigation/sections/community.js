import {
  main as formatCommunityMainLink
} from '*/helpers/formatters/links/community'

export default function ({ communityId, communityTitle, isActive }) {
  const formatLink = () => {
    if (!isActive) {
      return formatCommunityMainLink({
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
