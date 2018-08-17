module Muffon
  module Processor
    class Play < Muffon::Base
      def call
        process_play
        connect_tracks_with_albums
      end

    private

      def process_play
        ::Play.where(play_attributes).first_or_create!
      end

      def play_attributes
        {
          profile_id:        @args.profile_id,
          profile_track_id:  profile_track.id,
          track_id:          profile_track.track_id,
          profile_artist_id: profile_track.profile_artist_id,
          artist_id:         profile_track.artist_id,
          profile_album_id:  profile_album&.id,
          album_id:          profile_album&.album_id,
          created_at:        @args.play[:created_at]
        }
      end

      def profile_track
        @profile_track ||=
          Muffon::Processor::ProfileTrack.call(play_params)
      end

      def play_params
        {
          profile_id: @args.profile_id,
          track:      @args.play,
          album:      album_data
        }
      end

      def album_data
        @args.play[:album].merge(artist: @args.play[:artist])
      end

      def profile_album
        @profile_album ||=
          Muffon::Processor::ProfileAlbum.call(play_params)
      end

      def connect_tracks_with_albums
        return unless profile_album.present?

        profile_track.update(profile_album_ids: profile_album_ids)
        profile_track.track.update(album_ids: album_ids)
        profile_album.update(profile_track_ids: profile_track_ids)
      end

      def profile_album_ids
        profile_track.profile_album_ids |= [profile_album.id].compact
      end

      def album_ids
        profile_track.track.album_ids |= [profile_album.album_id].compact
      end

      def profile_track_ids
        profile_album.profile_track_ids |= [profile_track.id]
      end
    end
  end
end
