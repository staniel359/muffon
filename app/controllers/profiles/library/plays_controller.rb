module Profiles
  module Library
    class PlaysController < ApplicationController
      def index
        @page_data = {
          title: title,
          plays: paginate(plays, 20)
        }
        respond_with_js_and_html
      end

    private

      def title
        t(
          "profiles.library.plays.#{params[:action]}",
          profile: profile.nickname
        )
      end

      def artists
        profile.plays.includes(
          profile_artist: :artist,
          profile_track:  :track,
          profile_album:  :album
        ).created_desc
      end
    end
  end
end
