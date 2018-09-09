module Profiles
  module Library
    class ArtistsController < ApplicationController
      before_action :set_profile

      def index
        set_artists
        set_title
        respond_with_js_and_html
      end

      def show
        set_artist
        set_title
        set_taggings
        set_tracks
        set_albums
        set_plays
      end

      def create
        set_object
        add_artist_to_library
        process_recommendations
        respond_with_js
      end

    private

      def set_artists
        @artists = paginate(retrieve_artists, 24)
      end

      def retrieve_artists
        ::Library::Collection.call(
          profile_id:      @profile.id,
          collection_name: 'artists',
          scope:           params[:scope],
          order:           params[:order]
        ).associated
      end

      def set_title
        @title = t(
          "profiles.library.artists.#{params[:action]}",
          profile: @profile.nickname,
          artist:  @artist&.name
        )
      end

      def set_artist
        @artist = @profile.profile_artists.joins(
          'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
        ).find_by(
          'LOWER(artists.name) = ?', params[:artist_name]&.downcase
        ).decorate
      end

      def set_taggings
        @taggings = @artist.taggings.associated
      end

      def set_tracks
        @tracks =
          @artist.profile_tracks.associated.plays_count_desc.limit(5).decorate
      end

      def set_albums
        @albums =
          @artist.profile_albums.associated.plays_count_desc.limit(3).decorate
      end

      def set_plays
        @plays = @artist.plays.created_desc.associated.limit(10).decorate
      end

      def set_object
        @object = Artist.find_by(id: params[:artist_id])
      end

      def add_artist_to_library
        @profile_artist = current_profile.profile_artists.where(
          artist_id: params[:artist_id]
        ).first_or_create
      end

      def process_recommendations
        ::ArtistRecommendationsProcessorWorker.perform_async(
          @profile_artist.id, current_profile.id
        )
      end
    end
  end
end
