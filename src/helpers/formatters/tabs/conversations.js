import i18n from '&/i18n'
import {
  main as formatConversationsLink,
  conversation as formatConversationLink
} from '#/formatters/links/conversations'

export default function ({ conversationId, profileNickname } = {}) {
  const conversationsTitle = i18n.global.t(
    'navigation.conversations'
  )

  const title = [
    profileNickname,
    conversationsTitle
  ].filter(e => e).join(' | ')

  const formatPath = () => {
    if (profileNickname) {
      return formatConversationLink({
        conversationId
      }).path
    } else {
      return formatConversationsLink().path
    }
  }

  return {
    icon: 'comments',
    title,
    path: formatPath()
  }
}
