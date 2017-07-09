class MessagesController < ApplicationController
  before_action :set_recipient, only: [:new, :create]

  def new
    @title = "New message to #{@other_profile.nickname}"
    @message = current_profile.messages.build
  end

  def create
    @message = current_profile.messages.build(message_params)
    if @message.profile_id.present? && @message.content.present?
      @conversation = current_profile.conversation_with(@other_profile)
      @message.conversation_id = @conversation.id
      if @message.save!
        @message.update!(new: 1)
        @conversation.update!(updated_at: @message.created_at)
        if params[:to]
          redirect_to conversation_path(@conversation)
        else
          respond_to :js
        end
      else
        @message = []
        respond_to :js
      end
    else
      @message = []
      respond_to :js
    end
  end

  private

    def message_params
      params.require(:message).permit(:profile_id, :content, :conversation_id, :new)
    end

    def set_recipient
      if params[:to]
        @other_profile = Profile.find(params[:to])
      else
        @conversation = Conversation.find(params[:conversation_id])
        @other_profile = other_profile_of(@conversation)
      end
    end
end
