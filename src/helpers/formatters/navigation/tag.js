import i18n from '&/i18n'
import { main as formatTagMainLink } from '#/formatters/links/tag'

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
        name: i18n.global.t(
          `layout.navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
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
