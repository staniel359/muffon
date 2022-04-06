import i18n from '*/plugins/i18n'
import {
  communities as formatCommunitiesLink
} from '*/helpers/formatters/links'

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
