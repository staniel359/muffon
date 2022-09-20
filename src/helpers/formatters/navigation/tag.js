import formatTagsSection
  from '@/helpers/formatters/navigation/sections/tags'
import formatTagSection
  from '@/helpers/formatters/navigation/sections/tag'
import formatSubpageSection
  from '@/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    tagName,
    scope
  }
) {
  return [
    formatTagsSection(),
    formatTagSection(
      {
        tagName,
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
