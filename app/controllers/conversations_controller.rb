class ConversationsController < ApplicationController
  def index
    should_login
    @page_data = {
      title:         title,
      conversations: conversations
    }
  end

  def show
    should_login
    check_conversation_access
    @page_data = {
      title:        title,
      conversation: conversation
    }
    read_new_messages
  end

private

  def title
    t(
      "conversations.#{params[:action]}",
      other_profile: other_profile&.nickname || 'Deleted Profile'
    )
  end

  def other_profile
    conversation&.other_member(current_profile.id)
  end

  def conversation
    @conversation ||=
      Conversation.find_by(id: params[:conversation_id])
  end

  def conversations
    paginate(current_profile.conversations.updated_desc, 20)
  end

  def check_conversation_access
    redirect_to root_path unless can_access_conversation?
  end

  def can_access_conversation?
    conversation&.member?(current_profile.id)
  end

  def read_new_messages
    new_messages.update_all(new: false)
    update_new_messages_counter
  end

  def update_new_messages_counter
    $redis.decrby(
      "#{current_profile.id}:new_messages", new_messages.count
    )
  end

  def new_messages
    @new_messages ||= conversation.messages.to(
      current_profile.id
    ).new_messages
  end
end
