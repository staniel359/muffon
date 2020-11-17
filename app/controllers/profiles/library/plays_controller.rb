module Profiles
  module Library
    class PlaysController < ApplicationController
      before_action :set_profile, :set_title

      def index
        set_plays
      end

    private

      def set_title
        @title = t(
          "profiles.library.plays.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def set_plays
        @plays = paginate(
          @profile.plays.associated.created_desc, 20
        )
      end
    end
  end
end
