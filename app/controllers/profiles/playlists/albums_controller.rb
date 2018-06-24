module Profiles
  module Playlists
    class AlbumsController < Profiles::PlaylistsController
      def create
        check_correct_profile
        add_album_to_playlist
        @page_data = {
          tracks: playlist_tracks
        }
        respond_with_js
      end

      def destroy
        check_correct_profile
        delete_album_from_playlist
        @page_data = {
          tracks: playlist_tracks
        }
        respond_with_js
      end

      def show_tracks
        @page_data = {
          tracks: tracks
        }
        respond_with_js
      end

    private

      def add_album_to_playlist
        tracks.each { |t| add_track_to_playlist(t) }
      end

      def tracks
        if params[:album_id]
          album_tracks
        elsif params[:profile_album_id]
          profile_album_tracks
        end
      end

      def album_tracks
        Album.find_by(id: params[:album_id]).tracks
      end

      def profile_album_tracks
        ProfileAlbum.find_by(id: params[:profile_album_id]).tracks
      end

      def add_track_to_playlist(track)
        find_playlist_track(track).tap do |attr|
          attr.album_ids |= track.album_ids
          attr.save
        end
      end

      def find_playlist_track(track)
        playlist.playlist_tracks.where(
          track_id:  track.id,
          artist_id: track.artist_id
        ).first_or_initialize
      end

      def delete_album_from_playlist
        album_playlist_tracks.each { |t| delete_track_if_no_albums(t) }
      end

      def album_playlist_tracks
        playlist.playlist_tracks.where(album_id: params[:album_id])
      end

      def delete_track_if_no_albums(track)
        track.tap do |attr|
          attr.album_ids -= [params[:album_id]]
          attr.album_ids.empty? ? attr.delete : attr.save
        end
      end
    end
  end
end
