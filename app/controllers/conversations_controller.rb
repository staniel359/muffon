class ConversationsController < ApplicationController
  before_action :should_login
  before_action :set_conversation, except: :index

  def index
    set_conversations
    set_title
  end

  def show
    check_conversation_access
    set_conversation_messages
    set_other_member
    read_new_messages(profile_id: @other_member.id)
    set_title
  end

  def load_messages
    set_conversation_messages
    respond_with_js_and_json
  end

  def read_messages
    read_new_messages(id: params[:message_ids])
    set_other_member
    broadcast_to_other_member
    respond_with_js
  end

private

  def set_conversations
    @conversations = paginate(
      current_profile.conversations.updated_desc, 20
    )
  end

  def set_title
    @title = t(
      "conversations.#{params[:action]}",
      other_member: @other_member&.nickname || 'Deleted Profile'
    )
  end

  def set_conversation
    @conversation = current_profile.conversations.find_by(
      id: params[:conversation_id]
    )
  end

  def check_conversation_access
    redirect_to conversations_path unless
        @conversation&.member?(current_profile.id)
  end

  def set_conversation_messages
    @messages = @conversation.messages.includes(
      :profile
    ).created_desc.limit(20).offset(params[:offset].to_i).decorate
  end

  def set_other_member
    @other_member = @conversation&.other_member(current_profile.id)
  end

  def respond_with_js_and_json
    respond_to do |format|
      format.js { render layout: false }
      format.json { render json: @messages }
    end
  end

  def read_new_messages(query)
    @conversation.messages.where(query).update_all(new: false)
  end

  def broadcast_to_other_member
    ActionCable.server.broadcast(
      "messaging_#{@other_member.id}",
      s: rendered_message_status, c: @conversation.id
    )
  end

  def rendered_message_status
    ApplicationController.render(
      partial: 'messages/status',
      locals: { new: false }
    )
  end
end
