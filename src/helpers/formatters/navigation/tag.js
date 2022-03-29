import i18n from '*/plugins/i18n'
import { main as formatTagMainLink } from '*/helpers/formatters/links/tag'

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
          `navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.tags'
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
