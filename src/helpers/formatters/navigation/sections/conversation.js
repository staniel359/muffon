import {
  conversation as formatConversationLink
} from '@/helpers/formatters/links/conversations'

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
