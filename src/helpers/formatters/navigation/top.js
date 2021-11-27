import i18n from '&/i18n'
import { main as formatTopMainLink } from '#/formatters/links/top'

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
          `layout.navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'layout.navigation.tops'
      ),
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
