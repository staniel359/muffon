module Profiles
  module Library
    class AlbumsController < ApplicationController
      before_action :set_profile, :set_title

      def index
        @pagy, @albums = pagy(albums)
        respond_with_js_and_html
      end

    private

      def set_title
        @title = t(
          "profiles.library.albums.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def albums
        ::Library::Collection.call(
          profile_id:      @profile.id,
          collection_name: 'albums',
          scope:           params[:scope],
          order:           params[:order]
        ).includes(:album, :artist)
      end
    end
  end
end
