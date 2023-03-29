import {
  main as formatCommunityLink
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
      return formatCommunityLink(
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
