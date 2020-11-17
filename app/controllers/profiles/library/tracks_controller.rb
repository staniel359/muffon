module Profiles
  module Library
    class TracksController < ApplicationController
      before_action :set_profile, :set_title

      def index
        set_tracks
        respond_with_js_and_html
      end

    private

      def set_title
        @title = t(
          "profiles.library.tracks.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def set_tracks
        @tracks = paginate(retrieve_tracks, 20)
      end

      def retrieve_tracks
        ::Library::Collection.call(
          profile_id: @profile.id,
          collection_name: 'tracks',
          scope: params[:scope],
          order: params[:order]
        ).associated
      end
    end
  end
end
