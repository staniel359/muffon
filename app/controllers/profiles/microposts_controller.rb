module Profiles
  class MicropostsController < ApplicationController
    before_action :set_profile

    def index
      set_title
      set_microposts
    end

    def create
      create_micropost
      respond_with_js
    end

    def destroy
      set_micropost
      @micropost&.destroy
      respond_with_js
    end

  private

    def set_title
      @title = t(
        "profiles.board.#{params[:action]}",
        profile: @profile.nickname
      )
    end

    def set_microposts
      @microposts =
        @profile.board_microposts.created_desc.includes(:profile)
    end

    def create_micropost
      @micropost = current_profile.microposts.create(
        micropost_params
      )
    end

    def micropost_params
      params.require(:micropost).permit(:content, :board_id)
    end

    def set_micropost
      @micropost = current_profile.board_microposts.find_by(
        id: params[:micropost_id]
      )
    end
  end
end
