module Profiles
  module Library
    class LovedTracksController < ApplicationController
      before_action :set_profile, :set_title

      def index
        set_loved_tracks
      end

    private

      def set_title
        @title = t(
          "profiles.library.loved_tracks.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def set_loved_tracks
        @loved_tracks = paginate(
          @profile.profile_tracks.loved.associated.loved_desc, 20
        )
      end
    end
  end
end
