import i18n from '*/plugins/i18n'
import { main as formatTopMainLink } from '*/helpers/formatters/links/top'

export default function ({ pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatTopMainLink()
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
        'navigation.tops'
      ),
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
