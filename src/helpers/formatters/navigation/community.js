import formatCommunitiesSection
  from '@/helpers/formatters/navigation/sections/communities'
import formatCommunitySection
  from '@/helpers/formatters/navigation/sections/community'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    communityId,
    communityTitle,
    scope
  }
) {
  return [
    formatCommunitiesSection(),
    formatCommunitySection(
      {
        communityId,
        communityTitle,
        isActive: !scope
      }
    ),
    scope && formatSubpageSection(
      {
        scope
      }
    )
  ].filter(
    e => e
  )
}
