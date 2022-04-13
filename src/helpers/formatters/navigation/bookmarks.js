import formatBookmarksSection
  from '*/helpers/formatters/navigation/sections/bookmarks'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    scope
  }
) {
  return [
    formatBookmarksSection(
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
