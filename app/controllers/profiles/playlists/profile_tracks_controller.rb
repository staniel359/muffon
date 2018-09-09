module Profiles
  module Playlists
    class ProfileTracksController < ApplicationController
      before_action :set_playlist, :set_track, :set_album,
                    except: :add_to_playlists

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
        add_track_to_playlists
        respond_with_js
      end

    private

      def set_playlist
        @playlist = current_profile.playlists.find_by(
          id: params[:playlist_id]
        )
      end

      def set_track
        @track = ProfileTrack.find_by(
          id: params[:profile_track_id]
        ).decorate
      end

      def set_album
        @album = ProfileAlbum.find_by(
          id: params[:profile_album_id]
        )
      end

      def add_track_to_playlist(playlist)
        find_playlist_track(playlist).tap do |t|
          t.profile_track_id   = @track.id
          t.profile_artist_id  = @track.profile_artist_id
          t.profile_album_id ||= @album&.id
          t.album_id         ||= @album&.album_id
          t.save
        end
      end

      def find_playlist_track(playlist)
        playlist.playlist_tracks.where(
          profile_id: current_profile.id,
          track_id:   @track.track_id,
          artist_id:  @track.artist_id
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

      def delete_track_from_playlist
        @playlist.playlist_tracks.find_by(
          track_id: @track.track_id
        )&.destroy
      end

      def add_track_to_playlists
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
