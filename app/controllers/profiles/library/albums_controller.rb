module Profiles
  module Library
    class AlbumsController < ApplicationController
      def index
        @page_data = {
          title:  title,
          albums: paginate(albums, 20)
        }
        respond_with_js_and_html
      end

    private

      def title
        t(
          "profiles.library.albums.#{params[:action]}",
          profile: profile.nickname
        )
      end

      def albums
        profile.profile_albums.includes(:album).created_desc
      end
    end
  end
end
