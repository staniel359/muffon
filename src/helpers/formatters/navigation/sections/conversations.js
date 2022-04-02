import i18n from '*/plugins/i18n'
import {
  main as formatConversationsLink
} from '*/helpers/formatters/links/conversations'

export default function ({ isActive } = {}) {
  const formatLink = () => {
    if (!isActive) {
      return formatConversationsLink()
    }
  }

  return {
    name: i18n.global.t(
      'navigation.conversations'
    ),
    isActive,
    link: formatLink()
  }
}
