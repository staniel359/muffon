export function main () {
  return {
    name: 'ConversationsPage',
    params: {},
    path: 'conversations'
  }
}

export function conversation (
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
