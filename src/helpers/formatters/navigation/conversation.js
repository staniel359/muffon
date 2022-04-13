import formatConversationsSection
  from '*/helpers/formatters/navigation/sections/conversations'
import formatConversationSection
  from '*/helpers/formatters/navigation/sections/conversation'
import formatSubpageSection
  from '*/helpers/formatters/navigation/sections/subpage'

export default function (
  {
    profileNickname,
    conversationId,
    scope
  }
) {
  return [
    formatConversationsSection(),
    formatConversationSection(
      {
        profileNickname,
        conversationId,
        isActive: !scope
      }
    ),
    scope && formatSubpageSection(
      {
        scope
      }
    )
  ].filter(
    e => e
  )
}
