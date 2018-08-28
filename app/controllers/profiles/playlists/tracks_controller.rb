module Profiles
  module Playlists
    class TracksController < ApplicationController
      before_action :set_playlist, :set_track, only: %i[create destroy]

      def create
        add_track_to_playlist(@playlist)
        set_playlist_tracks
        respond_with_js
      end

      def destroy
        delete_track_from_playlist
        set_playlist_tracks
        respond_with_js
      end

      def add_to_playlists
        check_correct_profile
        process_playlists
        respond_with_js
      end

    private

      def set_playlist
        @playlist = current_profile.playlists.find_by(
          id: params[:playlist_id]
        )
      end

      def set_track
        @track = Track.find_by(id: params[:track_id])
      end

      def add_track_to_playlist(playlist)
        playlist.playlist_tracks.where(
          track_id:  @track.id,
          artist_id: @track.artist_id
        ).first_or_create
      end

      def set_playlist_tracks
        @tracks = paginate(playlist_tracks, 20)
      end

      def playlist_tracks
        @playlist.playlist_tracks.includes(
          :artist, [track: :artist]
        ).created_asc
      end

      def delete_track_from_playlist
        @playlist.playlist_tracks.find_by(
          track_id: @track.id
        )&.destroy
      end

      def process_playlists
        return unless params[:playlist_ids].present?

        playlists.each { |p| add_track_to_playlist(p) }
      end

      def playlists
        current_profile.playlists.where(
          id: params[:playlist_ids]
        )
      end
    end
  end
end
