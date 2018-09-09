module Profiles
  module Library
    class AlbumsController < ApplicationController
      before_action :set_profile, :set_title

      def index
        set_albums
        respond_with_js_and_html
      end

    private

      def set_title
        @title = t(
          "profiles.library.albums.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def set_albums
        @albums = paginate(retrieve_albums, 24)
      end

      def retrieve_albums
        ::Library::Collection.call(
          profile_id:      @profile.id,
          collection_name: 'albums',
          scope:           params[:scope],
          order:           params[:order]
        ).associated
      end
    end
  end
end
