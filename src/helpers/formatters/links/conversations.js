export const main = () => {
  return {
    name: 'ConversationsPage',
    params: {},
    path: 'conversations'
  }
}

export const conversation = ({ conversationId }) => {
  return {
    name: 'ConversationPage',
    params: { conversationId },
    path: `conversations/${conversationId}`
  }
}
