import i18n from '@/plugins/i18n'
import {
  main as formatConversationsLink,
  conversation as formatConversationLink
} from '@/helpers/formatters/links/conversations'

export default function (
  {
    conversationId,
    profileNickname
  } = {}
) {
  const conversationsTitle = i18n.global.t(
    'navigation.conversations'
  )

  const title = [
    profileNickname,
    conversationsTitle
  ].filter(
    e => e
  ).join(
    ' | '
  )

  function formatLink () {
    if (profileNickname) {
      return formatConversationLink(
        {
          conversationId
        }
      )
    } else {
      return formatConversationsLink()
    }
  }

  const link = formatLink()

  return {
    icon: 'conversation',
    title,
    link,
    path: link.path
  }
}
