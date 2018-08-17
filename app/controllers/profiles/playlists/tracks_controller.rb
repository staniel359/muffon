module Profiles
  module Playlists
    class TracksController < Profiles::PlaylistsController
      def create
        check_correct_profile
        add_track_to_playlist(playlist)
        @page_data = {
          tracks: playlist_tracks
        }
        respond_with_js
      end

      def destroy
        check_correct_profile
        delete_track_from_playlist
        @page_data = {
          tracks: playlist_tracks
        }
        respond_with_js
      end

      def add_to_playlists
        check_correct_profile
        process_playlists
        respond_with_js
      end

    private

      def add_track_to_playlist(playlist)
        playlist.playlist_tracks.create(
          track_id:  track.id,
          artist_id: track.artist_id
        )
      end

      def track
        @track ||= begin
          if params[:track_id]
            find_track
          elsif params[:profile_track_id]
            find_profile_track&.track
          end
        end
      end

      def find_track
        Track.find_by(id: params[:track_id])
      end

      def find_profile_track
        ProfileTrack.find_by(id: params[:profile_track_id])
      end

      def delete_track_from_playlist
        playlist.playlist_tracks.find_by(
          track_id: params[:track_id]
        )&.destroy
      end

      def process_playlists
        return unless params[:playlist_ids].present?

        playlists.each { |p| add_track_to_playlist(p) }
      end

      def playlists
        current_profile.playlists.where(id: params[:playlist_ids])
      end
    end
  end
end
