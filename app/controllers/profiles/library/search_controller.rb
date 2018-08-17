module Profiles
  module Library
    class SearchController < ApplicationController
      def index
        @artists = search_artists
        @albums = search_albums
        @tracks = search_tracks
        respond_with_js
      end

    private

      def set_title; end

      def search_artists
        search_data[:artists].decorate
      end

      def search_data
        @search_data ||= ::Library::Search.call(
          profile_id: @profile.id, q: params[:q]
        )
      end

      def search_albums
        search_data[:albums].decorate
      end

      def search_tracks
        search_data[:tracks].decorate
      end
    end
  end
end
