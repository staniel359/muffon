import formatTopSection
  from '*/helpers/formatters/navigation/sections/top'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    scope
  }
) {
  return [
    formatTopSection(
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
