module Profiles
  module Library
    class TracksController < ApplicationController
      before_action :set_profile, :set_title

      def index
        @pagy, @tracks = pagy(tracks)
        respond_with_js_and_html
      end

    private

      def set_title
        @title = t(
          "profiles.library.tracks.#{params[:action]}",
          profile: @profile.nickname
        )
      end

      def tracks
        ::Library::Collection.call(
          profile_id:      @profile.id,
          collection_name: 'tracks',
          scope:           params[:scope],
          order:           params[:order]
        ).includes(:artist, [track: :artist])
      end
    end
  end
end
