class ConversationsController < ApplicationController
  before_action :set_profile

  def index
    @title = 'Conversations'
    @conversations = @profile.conversations
  end

  # def show
  # end

  # def destroy
  # end

  private

     def set_profile
      @profile = current_profile
     end
end
