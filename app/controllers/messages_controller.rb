class MessagesController < ApplicationController
  before_action :find_recipient
  before_action :find_conversation, only: :new

  def new
    @title = "New message to #{@recipient.nickname}"
    @message = current_profile.messages.new
  end

  def create
    @message = current_profile.messages.new(message_params)
    if @message.can_be_saved?
      process_message
    else
      ignore_blank_message
    end
  end

private

  def find_recipient
    @recipient = Profile.find_by(id: params[:to])

    redirect_to root_path unless @recipient.present?
  end

  def find_conversation
    redirect_to conversation_path(found_conversation) if
      found_conversation.present?
  end

  def found_conversation
    current_profile.conversation_with(params[:to]).first
  end

  def message_params
    params.require(:message).permit(
      :profile_id, :content, :conversation_id, :new
    )
  end

  def process_message
    process_conversation
    add_message_to_new_messages
    go_to_conversation
  end

  def process_conversation
    @conversation = current_profile.new_conversation_with(params[:to])
    @message.update(conversation_id: @conversation.id, new: 1)
    @conversation.update(updated_at: @message.created_at)
  end

  def add_message_to_new_messages
    conversation_key? ? add_to_key : create_key
  end

  def conversation_key?
    @recipient.new_messages.keys.include?(@conversation.id.to_s)
  end

  def add_to_key
    @recipient.tap do |h|
      h.new_messages[@conversation.id.to_s] |= [@message.id]
    end.save
  end

  def create_key
    @recipient.tap do |h|
      h.new_messages.merge!(@conversation.id => [@message.id])
    end.save
  end

  def go_to_conversation
    if params[:conversation_id].present?
      respond_to do |format|
        format.js { render layout: false }
      end
    else
      redirect_to conversation_path(@conversation)
    end
  end

  def ignore_blank_message
    @message = []
    respond_to do |format|
      format.js { render layout: false }
    end
  end
end
