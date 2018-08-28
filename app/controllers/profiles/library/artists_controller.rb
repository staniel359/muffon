module Profiles
  module Library
    class ArtistsController < ApplicationController
      before_action :set_profile
      before_action :set_artist, except: %i[index create]
      before_action :set_title, only: %i[index show]

      def index
        @pagy, @artists = pagy(artists)
        respond_with_js_and_html
      end

      def show
        @tracks = tracks
        @albums = albums
        @plays = plays
      end

      def create
        @object = object
        @profile_artist = add_artist_to_library
        process_profile_artist_recommendations
        respond_with_js
      end

    private

      def set_artist
        @artist = @profile.profile_artists.joins(
          'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
        ).find_by(
          'LOWER(artists.name) = ?', params[:artist_name]&.downcase
        ).decorate
      end

      def set_title
        @title = t(
          "profiles.library.artists.#{params[:action]}",
          profile: @profile.nickname,
          artist:  @artist&.name
        )
      end

      def artists
        ::Library::Collection.call(
          profile_id:      @profile.id,
          collection_name: 'artists',
          scope:           params[:scope],
          order:           params[:order]
        ).includes(:artist)
      end

      def tracks
        @artist.profile_tracks.includes(
          :artist, [track: :artist]
        ).plays_count_desc.limit(5).decorate
      end

      def albums
        @artist.profile_albums.includes(
          :artist, :album
        ).plays_count_desc.limit(3).decorate
      end

      def plays
        @artist.plays.created_desc.includes(
          :artist, [track: :artist], :album, :profile_track
        ).limit(10).decorate
      end

      def object
        Artist.find_by(id: params[:artist_id])
      end

      def add_artist_to_library
        current_profile.profile_artists.where(
          artist_id: params[:artist_id]
        ).first_or_create
      end

      def process_profile_artist_recommendations
        ::ArtistRecommendationsProcessorWorker.perform_async(
          @profile_artist.id, current_profile.id
        )
      end
    end
  end
end
