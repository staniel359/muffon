import i18n from '&/i18n'
import {
  main as formatConversationsLink
} from '#/formatters/links/conversations'

export default function ({ conversationId, profileNickname } = {}) {
  const formatLink = () => {
    if (profileNickname) {
      return formatConversationsLink()
    }
  }

  const formatSubpageSection = () => {
    if (profileNickname) {
      return {
        name: profileNickname,
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'layout.navigation.conversations'
      ),
      isActive: !profileNickname,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
