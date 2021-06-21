import { tagMain as formatTagMainLink } from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export default function ({ tagName, pageNameKey }) {
  const tagsPageName = localize(
    'layout.navigation.tags'
  )

  const formatLink = () => {
    if (pageNameKey) {
      return formatTagMainLink({
        tagName
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      const tagPageName = localize(
        `layout.navigation.tag.${pageNameKey}`
      )

      return {
        name: tagPageName,
        isActive: true
      }
    }
  }

  return [
    { name: tagsPageName },
    {
      name: tagName,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
