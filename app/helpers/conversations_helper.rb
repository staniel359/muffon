module ConversationsHelper
  def other_profile_of(conversation)
    conversation.sender_id == current_profile.id ? conversation.recipient : conversation.sender
  end

  def participates_in(conversation)
  	conversation.sender_id == current_profile.id || conversation.recipient_id == current_profile.id
  end

  def new_messages_from(conversation)
  	conversation.messages.where('new = ? and profile_id <> ?', 1, current_profile.id)
  end
end
