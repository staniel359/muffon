module Conversations
  class MessagesController < ApplicationController
    def create
      send_message
      respond_with_js
    end

    def open_modal
      respond_with_js
    end

  private

    def send_message
      send_valid_message if valid_message?
    end

    def valid_message?
      message.sendable? && recipient.present?
    end

    def message
      @message ||= current_profile.messages.new(message_params)
    end

    def message_params
      params.require(:message).permit(
        :profile_id, :content, :conversation_id, track_ids: []
      )
    end

    def recipient
      @recipient ||= Profile.find_by(nickname: params[:to])
    end

    def send_valid_message
      conversation = current_profile.conversation_with(recipient.id)
      message.update(conversation_id: conversation.id)
      conversation.touch
      $redis.rpush("#{recipient.id}:new_messages", message.id)
    end
  end
end
