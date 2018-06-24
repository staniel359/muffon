module Profiles
  module Library
    class LovedTracksController < ApplicationController
      def index
        @page_data = {
          title:        title,
          loved_tracks: paginate(loved_tracks, 20)
        }
        respond_with_js_and_html
      end

    private

      def title
        t(
          "profiles.library.loved_tracks.#{params[:action]}",
          profile: profile.nickname
        )
      end

      def artists
        profile.profile_loved_tracks.includes(:track).created_desc
      end
    end
  end
end
