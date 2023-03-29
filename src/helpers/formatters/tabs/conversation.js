import i18n from '@/plugins/i18n'
import {
  main as formatConversationLink
} from '@/helpers/formatters/links/conversation'

export default function (
  {
    conversationId,
    profileNickname,
    scope
  }
) {
  const conversationsTitle =
    i18n.global.t(
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
    switch (scope) {
      default:
        return formatConversationLink(
          {
            conversationId
          }
        )
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
