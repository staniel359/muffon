module Profiles
  module Playlists
    class ArtistsController < Profiles::PlaylistsController
      def create
        check_correct_profile
        add_artist_to_playlist
        @page_data = {
          tracks: playlist_tracks
        }
        respond_with_js
      end

      def destroy
        check_correct_profile
        delete_artist_from_playlist
        @page_data = {
          tracks: playlist_tracks
        }
        respond_with_js
      end

    private

      def add_artist_to_playlist
        tracks.each { |t| add_track_to_playlist(t) }
      end

      def tracks
        ProfileArtist.find_by(
          id: params[:profile_artist_id]
        ).tracks
      end

      def add_track_to_playlist(track)
        playlist.playlist_tracks.where(
          track_id:  track.id,
          artist_id: track.artist_id
        ).first_or_create
      end

      def delete_artist_from_playlist
        playlist.playlist_tracks.where(
          artist_id: params[:artist_id]
        ).delete_all
      end
    end
  end
end
