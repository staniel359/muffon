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

  function formatPath () {
    if (profileNickname) {
      return formatConversationLink(
        {
          conversationId
        }
      ).path
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
