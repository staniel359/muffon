import i18n from '*/plugins/i18n'
import { main as formatTagMainLink } from '*/helpers/formatters/links/tag'

export default function ({ tagName, scope }) {
  const formatLink = () => {
    if (scope) {
      return formatTagMainLink({
        tagName
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
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
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
