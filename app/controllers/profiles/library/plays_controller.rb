module Profiles
  module Library
    class PlaysController < ApplicationController
      before_action :set_profile, :set_title

      def index
        @pagy, @plays = pagy(plays)
      end

    private

      def set_title
        @title = t(
          "profiles.library.plays.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def plays
        @profile.plays.created_desc.includes(
          :artist, [track: :artist], :album, :profile_track
        )
      end
    end
  end
end
