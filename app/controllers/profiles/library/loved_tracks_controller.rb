module Profiles
  module Library
    class LovedTracksController < ApplicationController
      before_action :set_profile, :set_title

      def index
        @pagy, @loved_tracks = pagy(loved_tracks)
      end

    private

      def set_title
        @title = t(
          "profiles.library.loved_tracks.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def loved_tracks
        @profile.profile_tracks.loved.includes(
          :artist, [track: :artist]
        ).loved_desc
      end
    end
  end
end
