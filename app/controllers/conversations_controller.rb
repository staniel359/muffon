class ConversationsController < ApplicationController
  before_action :should_login

  def index
    @title = 'Conversations'
    @conversations = current_profile.conversations.reorder('updated_at desc')
  end

  def show
    @conversation = Conversation.find_by(id: params[:id])
    if @conversation
      correct_profile
      new_messages_from(@conversation).each { |m| m.update!(new: nil) }
      @messages = @conversation.messages.order('created_at desc')
      @message = current_profile.messages.build
      @other_profile = other_profile_of(@conversation)
      @title = "Conversation with #{@other_profile.nickname}"
    else
      redirect_to root_path
    end
  end

  private

    def correct_profile
      redirect_to root_path unless participates_in(@conversation)
    end
end
