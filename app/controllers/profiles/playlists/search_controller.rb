module Profiles
  module Playlists
    class SearchController < ApplicationController
      before_action :set_profile, only: :index
      before_action :set_artist,
                    only: %i[show_artist_tracks show_artist_albums]
      before_action :set_album, only: :show_album_tracks

      def index
        @tracks = search_data[:tracks]&.decorate
        @artists = search_data[:artists]&.decorate
        @albums = search_data[:albums]&.decorate
        respond_with_js
      end

      def show_artist_tracks
        @tracks = artist_tracks
        respond_with_js
      end

      def show_artist_albums
        @albums = artist_albums
        respond_with_js
      end

      def show_album_tracks
        @tracks = album_tracks
        respond_with_js
      end

    private

      def set_artist
        @artist = ProfileArtist.find_by(
          id: params[:profile_artist_id]
        ).decorate
      end

      def set_album
        @album = ProfileAlbum.find_by(
          id: params[:profile_album_id]
        ).decorate
      end

      def search_data
        return {} unless params[:q].present?

        ::Library::Search.call(
          profile_id: current_profile.id,
          q:          params[:q]
        )
      end

      def artist_tracks
        @artist.profile_tracks.includes(
          :artist, :track
        ).plays_count_desc
      end

      def artist_albums
        @artist.profile_albums.includes(
          :artist, :album
        ).plays_count_desc
      end

      def album_tracks
        @album.profile_tracks.includes(
          :track, :artist
        ).plays_count_desc
      end
    end
  end
end
