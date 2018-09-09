module Profiles
  module Playlists
    class ProfileArtistsController < ApplicationController
      before_action :set_playlist, :set_artist

      def create
        add_artist_to_playlist
        set_playlist_tracks
        respond_with_js
      end

      def destroy
        delete_artist_from_playlist
        set_playlist_tracks
        respond_with_js
      end

    private

      def set_playlist
        @playlist = current_profile.playlists.find_by(
          id: params[:playlist_id]
        )
      end

      def set_artist
        @artist = ProfileArtist.find_by(
          id: params[:profile_artist_id]
        ).decorate
      end

      def add_artist_to_playlist
        @artist.profile_tracks.each { |t| add_track_to_playlist(t) }
      end

      def add_track_to_playlist(track)
        find_playlist_track(track).update(
          profile_track_id:  track.id,
          profile_artist_id: track.profile_artist_id
        )
      end

      def find_playlist_track(track)
        @playlist.playlist_tracks.where(
          profile_id: current_profile.id,
          track_id:   track.track_id,
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

      def delete_artist_from_playlist
        @playlist.playlist_tracks.where(
          artist_id: @artist.artist_id
        ).each(&:destroy)
      end
    end
  end
end
