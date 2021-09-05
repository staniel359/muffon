import { main as formatTagMainLink } from '#/formatters/links/tag'
import { localize } from '#/actions/plugins/i18n'

export default function ({ tagName, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatTagMainLink({
        tagName
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: localize(
          `layout.navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.tags'
      )
    },
    {
      name: tagName,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
