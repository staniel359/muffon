class ConversationsController < ApplicationController
  include ConversationsHelper
  before_action :should_login
  before_action :set_conversation, :check_conversation_access, only: :show

  def index
    @title = 'Conversations'
    @conversations = current_profile.conversations.order('updated_at desc')
  end

  def show
    read_new_messages

    @messages = @conversation.messages.order('created_at asc')
    @message = current_profile.messages.new
    @other_member = @conversation.other_member(current_profile.id)
    @title = "Conversation with #{@other_member&.nickname || 'Deleted Profile'}"
  end

private

  def set_conversation
    @conversation = current_profile.conversations.find_by(id: params[:id])
  end

  def check_conversation_access
    redirect_to root_path unless
      @conversation.present? && @conversation.member?(current_profile.id)
  end

  def read_new_messages
    new_messages.each { |m| m.update(new: nil) }
    current_profile.new_messages.delete(@conversation.id.to_s)
    current_profile.save
  end

  def new_messages
    @conversation.other_member_messages(current_profile.id).where(new: 1)
  end
end
