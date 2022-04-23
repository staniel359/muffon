import formatReleasesSection
  from '*/helpers/formatters/navigation/sections/releases'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    scope
  }
) {
  return [
    formatReleasesSection(
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
