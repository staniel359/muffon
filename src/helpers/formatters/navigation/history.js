import formatHistorySection
  from '@/helpers/formatters/navigation/sections/history'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    scope
  }
) {
  return [
    formatHistorySection(
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
