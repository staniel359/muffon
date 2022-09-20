import {
  main as formatCommunityMainLink
} from '@/helpers/formatters/links/community'

export default function (
  {
    communityId,
    communityTitle,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatCommunityMainLink(
        {
          communityId
        }
      )
    }
  }

  return {
    name: communityTitle,
    isActive,
    link: formatLink()
  }
}
