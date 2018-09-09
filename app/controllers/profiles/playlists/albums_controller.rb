module Profiles
  module Playlists
    class ProfileAlbumsController < ApplicationController
      before_action :set_playlist, :set_album

      def create
        add_album_to_playlist
        set_playlist_tracks
        respond_with_js
      end

      def destroy
        delete_album_from_playlist
        set_playlist_tracks
        respond_with_js
      end

    private

      def set_playlist
        @playlist = current_profile.playlists.find_by(
          id: params[:playlist_id]
        )
      end

      def set_album
        @album = Album.find_by(id: params[:album_id])
      end

      def add_album_to_playlist
        @album.tracks.each { |t| add_track_to_playlist(t) }
      end

      def add_track_to_playlist(track)
        find_playlist_track(track).update(
          album_id: @album.id
        )
      end

      def find_playlist_track(track)
        @playlist.playlist_tracks.where(
          profile_id: current_profile.id,
          track_id:   track.id,
          artist_id:  track.artist_id
        ).first_or_initialize
      end

      def set_playlist_tracks
        @tracks = paginate(playlist_tracks, 20)
      end

      def playlist_tracks
        @playlist.playlist_tracks.includes(
          :artist, [track: :artist], :album
        ).created_asc
      end

      def delete_album_from_playlist
        @playlist.playlist_tracks.where(
          album_id: @album.id
        ).each(&:destroy)
      end
    end
  end
end
