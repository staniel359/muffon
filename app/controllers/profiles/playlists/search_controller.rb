module Profiles
  module Playlists
    class SearchController < ApplicationController
      before_action :set_playlist_tracks, :set_playlist_ids, except: :index

      def index
        set_profile
        set_playlist_tracks
        set_playlist_ids
        set_tracks
        set_artists
        set_albums
        respond_with_js
      end

      def show_artist_tracks
        set_artist
        set_artist_tracks
        respond_with_js
      end

      def show_artist_albums
        set_artist
        set_artist_albums
        respond_with_js
      end

      def show_album_tracks
        set_album
        set_album_tracks
        respond_with_js
      end

    private

      def set_playlist_tracks
        @playlist_tracks = Playlist.find_by(
          id: params[:playlist_id]
        ).playlist_tracks
      end

      def set_playlist_ids
        @track_ids  = @playlist_tracks.pluck(:track_id)
        @artist_ids = @playlist_tracks.pluck(:artist_id)
        @album_ids  = @playlist_tracks.pluck(:album_id)
      end

      def set_tracks
        @tracks = search_data[:tracks]&.decorate
      end

      def search_data
        @search_data ||= ::Library::Search.call(
          profile_id: current_profile.id,
          q:          params[:q]
        )
      end

      def set_artists
        @artists = search_data[:artists]&.decorate
      end

      def set_albums
        @albums = search_data[:albums]&.decorate
      end

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

      def set_artist_tracks
        @tracks = @artist.profile_tracks.associated.plays_count_desc
      end

      def set_artist_albums
        @albums = @artist.profile_albums.associated.plays_count_desc
      end

      def set_album_tracks
        @tracks = @album.profile_tracks.associated.plays_count_desc
      end
    end
  end
end
