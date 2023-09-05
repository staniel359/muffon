import formatRecommendationsSection
  from '@/helpers/formatters/navigation/sections/recommendations'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    scope
  }
) {
  return [
    formatRecommendationsSection(
      {
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
