import {
  main as formatConversationLink
} from '@/helpers/formatters/links/conversation'

export default function (
  {
    profileNickname,
    conversationId,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatConversationLink(
        {
          conversationId
        }
      )
    }
  }

  return {
    name: profileNickname,
    isActive,
    link: formatLink()
  }
}
