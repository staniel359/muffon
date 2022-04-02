import i18n from '*/plugins/i18n'
import {
  main as formatCommunitiesLink
} from '*/helpers/formatters/links/communities'

export default function ({ isActive } = {}) {
  const formatLink = () => {
    if (!isActive) {
      return formatCommunitiesLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.communities'
    ),
    isActive,
    link: formatLink()
  }
}
