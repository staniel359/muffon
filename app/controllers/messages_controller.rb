class MessagesController < ApplicationController
  before_action :set_recipient

  def new
    respond_with_js
  end

  def create
    set_message
    process_message if valid_message?
    respond_with_js
  end

private

  def set_recipient
    @recipient = Profile.find_by(id: params[:recipient_id])
  end

  def set_message
    @message = current_profile.messages.new(message_params).decorate
  end

  def message_params
    params.require(:message).permit(
      :profile_id, :content, :conversation_id, track_ids: []
    )
  end

  def valid_message?
    @message.sendable? && @recipient.present?
  end

  def process_message
    set_conversation
    send_message
    broadcast_to_recipient
  end

  def set_conversation
    @conversation =
      current_profile.conversation_with(@recipient.id)
  end

  def send_message
    @message.update(conversation_id: @conversation.id)
    @conversation.touch
  end

  def broadcast_to_recipient
    ActionCable.server.broadcast(
      "messaging_#{@recipient.id}",
      m: rendered_message, c: @conversation.id
    )
  end

  def rendered_message
    ApplicationController.render(
      partial: 'messages/message',
      locals: { message: @message, current_profile: @recipient }
    )
  end
end
