module Muffon
  module Processor
    class ProfileAlbum < Muffon::Base
      def call
        process_profile_album
      end

    private

      def process_profile_album
        profile_album.tap { profile_album_attributes }
      end

      def profile_album
        @profile_album ||= ::ProfileAlbum.where(
          profile_id:        @args.profile_id,
          album_id:          album_id,
          profile_artist_id: profile_artist_id,
          artist_id:         album.artist_id
        ).first_or_initialize
      end

      def album_id
        @args.album_id || album&.id
      end

      def album
        @album ||= Muffon::Processor::Album.call(album: album_data)
      end

      def album_data
        @args.album || custom_album_data
      end

      def profile_artist_id
        @profile_artist_id ||=
          @args.profile_artist_id || profile_artist.id
      end

      def profile_artist
        Muffon::Processor::ProfileArtist.call(
          profile_id: @args.profile_id,
          artist_id:  album.artist_id,
          created_at: track_data[:created_at]
        )
      end

      def track_data
        @args.track || {}
      end

      def profile_album_attributes
        profile_album.created_at ||= track_data[:created_at]
        profile_album.save!
      end
    end
  end
end
