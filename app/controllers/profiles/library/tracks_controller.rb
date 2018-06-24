module Profiles
  module Library
    class TracksController < ApplicationController
      def index
        @page_data = {
          title:  title,
          tracks: paginate(tracks, 20)
        }
        respond_with_js_and_html
      end

    private

      def title
        t(
          "profiles.library.tracks.#{params[:action]}",
          profile: profile.nickname
        )
      end

      def artists
        profile.profile_tracks.includes(:track).created_desc
      end
    end
  end
end
