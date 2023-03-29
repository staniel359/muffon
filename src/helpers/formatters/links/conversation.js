export function main (
  {
    conversationId
  }
) {
  return {
    name: 'ConversationPage',
    params: {
      conversationId
    },
    path: `conversations/${conversationId}`
  }
}
