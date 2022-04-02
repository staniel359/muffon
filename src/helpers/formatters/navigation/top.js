import i18n from '*/plugins/i18n'
import { main as formatTopMainLink } from '*/helpers/formatters/links/top'

export default function ({ scope }) {
  const formatLink = () => {
    if (scope) {
      return formatTopMainLink()
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
        'navigation.tops'
      ),
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
